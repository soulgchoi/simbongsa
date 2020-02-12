package test;

import java.text.SimpleDateFormat;

public class test {
	
	static SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	public static void main(String[] args) {
		String format_time = formatter.format(System.currentTimeMillis());
		System.out.println(format_time);
	}
}
