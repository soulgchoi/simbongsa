package com.react.util;

import com.react.dao.PostDao;

public class PostInsert {
	//PostDao dao;
	
	public static void main(String[] args) throws Exception {
		for(int i=4000; i<100000; i++) {
//			try {
			PostDao.addOrig(i);
//			} finally {
//				//
//			}
		}
	}
}
