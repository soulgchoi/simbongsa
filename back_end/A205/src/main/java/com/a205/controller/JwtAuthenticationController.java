package com.a205.controller;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Objects;

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
import com.a205.service.JwtUserDetailsService;
import com.a205.config.GoogleIdTokenUtil;
import com.a205.config.JwtTokenUtil;
import com.a205.dao.MemberDAO;
import com.a205.dto.Member;
import com.a205.model.JwtRequest;
import com.a205.model.JwtResponse;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;

@RestController
@CrossOrigin(origins = "*")
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private GoogleIdTokenUtil googleTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;

	@Autowired
	private MemberDAO memberDao;

	private static final String MY_APP_GOOGLE_CLIENT_ID = "266208955593-716c9b8v63c5vfrure5n1tv8n9lrld6p.apps.googleusercontent.com";

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

//		//로컬로그인
//		if(authenticationRequest.getPassword()!=null&&!authenticationRequest.getPassword().isEmpty()) {
//			authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());			
//		}else {
//			//구글 로그인
//			Member member = memberDao.searchByEmail(authenticationRequest.getUsername());
//			if(member.getM_email()==null||member.getM_email().isEmpty()) {
//				throw new Exception("Not Available GoogleID");
//			}
//		}
		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
		final String email = authenticationRequest.getUsername();
		final int id = userDetailsService.loadUserIdByUsername(authenticationRequest.getUsername());
		final String userId = userDetailsService.loadUserNickByUsername(authenticationRequest.getUsername());
		final String token = jwtTokenUtil.generateToken(email, userId, id);

		return ResponseEntity.ok(new JwtResponse(token));
	}

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> saveUser(@RequestBody Member member) throws Exception {
		return ResponseEntity.ok(userDetailsService.save(member));
	}

	@RequestMapping(value = "/loginByGoogle", method = RequestMethod.POST)
	public ResponseEntity<?> saveUserG(@RequestBody String receive_idToken) throws Exception {

		final NetHttpTransport transport = GoogleNetHttpTransport.newTrustedTransport();
		final JacksonFactory jsonFactory = JacksonFactory.getDefaultInstance();

		GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
				.setAudience(Collections.singletonList(MY_APP_GOOGLE_CLIENT_ID)).build();
		GoogleIdToken idToken;

		Member member = new Member();
		try {
			idToken = verifier.verify(receive_idToken);
			System.out.println(idToken);
			if (idToken == null) {
				System.out.println("토큰값이 없어요");
			}
			System.out.println(receive_idToken);
			System.out.println(idToken);
			if (idToken != null) {
				Payload payload = idToken.getPayload();

				// Print user identifier
				String email = payload.getEmail();
				String userid = email.substring(0, email.lastIndexOf("@"));
				System.out.println(userid);
				member.setM_email(email);
				member.setM_userid(userid);

				Member mem = memberDao.searchByEmail(email);
				if (mem.getM_email().isEmpty() || mem.getM_email() == null) {
					userDetailsService.saveByGoogle(member);
				}
				member = memberDao.searchByEmail(email);
			}
		} catch (GeneralSecurityException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("아니지롱");
		}

//		GoogleIdToken idToken = googleTokenUtil.verify(receive_idToken);
//		System.out.println(receive_idToken);
//		System.out.println(idToken);
//		Member member = new Member();
//		if (idToken != null) {
//			Payload payload = idToken.getPayload();
//
//			// Print user identifier
//			String email = payload.getEmail();
//			String userid = email.substring(0, email.lastIndexOf("@"));
//			System.out.println(userid);
//			member.setM_email(email);
//			member.setM_userid(userid);
//			
//			Member mem = memberDao.searchByEmail(email);
//			if(mem.getM_email().isEmpty()||mem.getM_email()==null) {
//				userDetailsService.saveByGoogle(member);
//			}
//			member = memberDao.searchByEmail(email);
//			
//		} else {
//			System.out.println("Invalid ID token.");
//		}
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