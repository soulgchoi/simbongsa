package com.a205.controller;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.a205.config.JwtTokenUtil;
import com.a205.dao.MemberDAO;
import com.a205.dto.Member;
import com.a205.model.JwtRequest;
import com.a205.model.JwtResponse;
import com.a205.service.JwtUserDetailsService;
import com.a205.service.UserMailSendService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

@RestController
@CrossOrigin(origins = "*")
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;

	@Autowired
	private MemberDAO memberDao;

	private static final String MY_APP_GOOGLE_CLIENT_ID = "250805409546-er21fuvg0j0v3db818cs9jjirslg0lpq.apps.googleusercontent.com";

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
		final String email = authenticationRequest.getUsername();
		final int id = userDetailsService.loadUserIdByUsername(authenticationRequest.getUsername());
		final String userId = userDetailsService.loadUserNickByUsername(authenticationRequest.getUsername());
		final String token = jwtTokenUtil.generateToken(email, userId, id);
		Member member = memberDao.searchByEmail(email);
		
		if(member.getM_key().equals("Y"))
			return ResponseEntity.ok(new JwtResponse(token));
		else 
			return ResponseEntity.ok("EmailAuthenticateNeed");
	}
	
	@RequestMapping(value = "/authenticateById", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationTokenById(@RequestBody JwtRequest authenticationRequest) throws Exception {

		final String userId = authenticationRequest.getUsername();
		final String email = userDetailsService.loadEmailByUserNick(userId);
		authenticate(email, authenticationRequest.getPassword());
		final int id = userDetailsService.loadUserIdByUsername(email);
		final String token = jwtTokenUtil.generateToken(email, userId, id);
		Member member = memberDao.searchByEmail(email);
		
		if(member.getM_key().equals("Y"))
			return ResponseEntity.ok(new JwtResponse(token));
		else 
			return ResponseEntity.ok("EmailAuthenticateNeed");
	}

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> saveUser(@RequestBody Member member) throws Exception {
		return ResponseEntity.ok(userDetailsService.save(member));
	}

	@RequestMapping(value = "/loginByGoogle", method = RequestMethod.POST)
	public ResponseEntity<?> saveUserG(@RequestBody String receive_idToken) throws Exception {

		final HttpTransport transport = new NetHttpTransport();
		final JacksonFactory jsonFactory = JacksonFactory.getDefaultInstance();

		GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
				.setAudience(Collections.singletonList(MY_APP_GOOGLE_CLIENT_ID)).build();
		GoogleIdToken idToken;

		Member member = new Member();
		try {
			idToken = verifier.verify(receive_idToken);
			if (idToken == null) {
				System.out.println("토큰값이 없어요");
			}else {
				Payload payload = idToken.getPayload();

				// Print user identifier
				String email = payload.getEmail();
				//String userid = email.substring(0, email.lastIndexOf("@"));
				String userid = email.substring(0, email.lastIndexOf("@") + 1); //일단 유저아이디에도 이메일 또는 특수문자가 들어가게 함.
				member.setM_email(email);
				member.setM_userid(userid);
				Member mem = memberDao.searchByEmail(email);
				if (mem == null) {
					userDetailsService.saveByGoogle(member);
				}
				member = memberDao.searchByEmail(email);
			}
		} catch (GeneralSecurityException | IOException e) {
			e.printStackTrace();
		}
		final String email = member.getM_email();
		final int id = member.getM_id();
		final String userId = member.getM_userid();
		final String token = jwtTokenUtil.generateToken(email, userId, id);

		return ResponseEntity.ok(new JwtResponse(token));
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			System.out.println("이메일 : " + username);
			System.out.println("비밀번호 : " + password);
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}