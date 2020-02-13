package com.react.util;

import com.react.dao.PostDao;

public class PostInsert {
	//PostDao dao;
	
	public static void main(String[] args) throws Exception {
		for(int i=2177; i<3000; i++) {
			try {
			PostDao.addOrig(i);
			} finally {
				//
			}
		}
	}
}
