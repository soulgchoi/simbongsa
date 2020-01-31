package com.react.util;
//세션을 생성해줌
import java.io.IOException;
import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class MyBatisUtil2 {
	// mybatis 환경 설정 파일 위치(경로)
    private final static String RESOURCE = "com/react/util/SqlMapConfig.xml";
    private static SqlSessionFactory factory = null;
    
    static { //이 부분을 체크할 필요 없이 한번만 하도록 static으로 빼두었다.
    	Reader reader= null;
        
        try {
              // mybatis.xml 자원을 얻는다.
              reader = Resources.getResourceAsReader(RESOURCE); //설정파일에 입력 파이프 연결
              factory = new SqlSessionFactoryBuilder().build(reader);
              
        } catch (IOException e) {
              e.printStackTrace();
              
        }
    }
    
    // MyBatis SqlSession을 얻는 메소드 //이 스태틱 메서드를 호출해서 얻어낸다.
    public static SqlSession getSqlSession() {
        return factory.openSession();
    }
}
