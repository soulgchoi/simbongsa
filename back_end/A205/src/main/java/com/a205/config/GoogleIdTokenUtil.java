package com.a205.config;

import java.io.IOException;
import java.io.Serializable;
import java.security.GeneralSecurityException;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.a205.dao.MemberDAO;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;

@Component
public class GoogleIdTokenUtil implements Serializable {
	
	private static final long serialVersionUID = -449544760442497357L;
	private static final HttpTransport transport = new NetHttpTransport();
	private static final JsonFactory jsonFactory = new JacksonFactory();
	private static final String MY_APP_GOOGLE_CLIENT_ID = "266208955593-716c9b8v63c5vfrure5n1tv8n9lrld6p.apps.googleusercontent.com";

	@Autowired
	MemberDAO memberDao;

	public GoogleIdToken verify(final String idTokenString) {
		GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
				.setAudience(Collections.singletonList(MY_APP_GOOGLE_CLIENT_ID)).build();
		GoogleIdToken idToken;
		try {
			idToken = verifier.verify(idTokenString);
			System.out.println(idToken);
			if (idToken == null) {
				System.out.println("토큰값이 없어요");
			}
			return idToken;
		} catch (GeneralSecurityException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("아니지롱");
		} // <-- verifier.verify returns null !!!
		return null;
	}
}
