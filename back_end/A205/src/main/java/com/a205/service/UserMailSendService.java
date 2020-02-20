package com.a205.service;

import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.a205.config.JwtTokenUtil;
import com.a205.dao.MemberDAO;
import com.a205.dto.Member;

@Service
public class UserMailSendService {

	@Autowired
	private JavaMailSender javaMailSender;

	@Autowired
	private MemberDAO memberDao;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	// 이메일 난수 만드는 메서드
	private String init() {
		Random ran = new Random();
		StringBuffer sb = new StringBuffer();
		int num = 0;

		do {
			num = ran.nextInt(75) + 48;
			if ((num >= 48 && num <= 57) || (num >= 65 && num <= 90) || (num >= 97 && num <= 122)) {
				sb.append((char) num);
			} else {
				continue;
			}

		} while (sb.length() < size);
		if (lowerCheck) {
			return sb.toString().toLowerCase();
		}
		return sb.toString();
	}

	// 난수를 이용한 키 생성
	private boolean lowerCheck;
	private int size;

	public String getKey(boolean lowerCheck, int size) {
		this.lowerCheck = lowerCheck;
		this.size = size;
		return init();
	}

	// 회원가입 발송 이메일(인증키 발송)
	public boolean mailSendWithUserKey(String m_email) {

		String key = getKey(false, 20);
		System.out.println(key);
		memberDao.GetKey(m_email, key);
		MimeMessage mail = javaMailSender.createMimeMessage();
		String htmlStr = "<h2>안녕하세요 心봉사 입니다!</h2><br><br>" + "<h3>" + m_email.substring(0, m_email.lastIndexOf("@"))
				+ "님</h3>" + "<p>인증하기 버튼을 누르시면 로그인을 하실 수 있습니다 : "
				+ "<a href='http://i02a205.p.ssafy.io/email/" + m_email + "/" + key
//				+ "<a href='http://localhost:3000/email/" + m_email + "/" + key
				+ "'>인증하기</a></p>" + "(혹시 잘못 전달된 메일이라면 이 이메일을 무시하셔도 됩니다)";
		try {
			mail.setSubject("[본인인증] 心봉사님의 인증메일입니다", "utf-8");
			mail.setText(htmlStr, "utf-8", "html");
			mail.addRecipient(RecipientType.TO, new InternetAddress(m_email));
			javaMailSender.send(mail);
			return true;
		} catch (MessagingException e) {
			e.printStackTrace();
			return false;
		}

	}

	// 비밀번호 변경 발송 이메일
	public boolean mailSendForPassword(String m_email) {
		Member member = memberDao.searchByEmail(m_email);
		//토큰 발급
		String passtoken = jwtTokenUtil.generateTokenPass(member.getM_email(), member.getM_userid(), member.getM_id());
		
		MimeMessage mail = javaMailSender.createMimeMessage();
		String htmlStr = "<h2>안녕하세요 心봉사 입니다!</h2><br><br>" + "<h3>" + m_email.substring(0, m_email.lastIndexOf("@"))
				+ "님</h3>" + "<p>변경하기 버튼을 누르시면 비밀번호를 변경하실 수 있습니다 : "
				+ "<a href='http://i02a205.p.ssafy.io/changepassword/" + passtoken
//				+ "<a href='htttp://localhost:3000/changepassword/" + passtoken 
				+ "'>변경하기</a></p>" + "(혹시 잘못 전달된 메일이라면 이 이메일을 무시하셔도 됩니다)";
		try {
			mail.setSubject("[본인인증] 心봉사님의 비밀번호 변경메일입니다", "utf-8");
			mail.setText(htmlStr, "utf-8", "html");
			mail.addRecipient(RecipientType.TO, new InternetAddress(m_email));
			javaMailSender.send(mail);
			return true;
		} catch (MessagingException e) {
			e.printStackTrace();
			return false;
		}

	}
}