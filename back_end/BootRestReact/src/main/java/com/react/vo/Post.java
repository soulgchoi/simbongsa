package com.react.vo;

public class Post {
	
	protected String v_id;
	protected String p_content;
	protected String m_id;
	protected String p_status;
	
	public Post() {}

	public Post(String v_id, String p_content, String m_id, String p_status) {
		this.v_id = v_id;
		this.p_content = p_content;
		this.m_id = m_id;
		this.p_status = p_status;
	}

	public String getV_id() {
		return v_id;
	}

	public void setV_id(String v_id) {
		this.v_id = v_id;
	}

	public String getP_content() {
		return p_content;
	}

	public void setP_content(String p_content) {
		this.p_content = p_content;
	}

	public String getM_id() {
		return m_id;
	}

	public void setM_id(String m_id) {
		this.m_id = m_id;
	}

	public String getP_status() {
		return p_status;
	}

	public void setP_status(String p_status) {
		this.p_status = p_status;
	}

	@Override
	public String toString() {
		return "Post [v_id=" + v_id + ", p_content=" + p_content + ", m_id=" + m_id + ", p_status=" + p_status + "]";
	}
	
}
