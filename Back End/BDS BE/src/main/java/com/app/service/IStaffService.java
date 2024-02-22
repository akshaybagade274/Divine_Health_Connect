package com.app.service;

import java.util.List;

import com.app.entities.User;

public interface IStaffService {

	List<?> getDonorList(String bloodGroup,int pinCode,int pageSize,int pageNo);

	
	
}
