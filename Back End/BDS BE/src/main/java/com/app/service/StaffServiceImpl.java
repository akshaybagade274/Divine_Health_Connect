package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.app.dao.AddressRepository;
import com.app.dao.UserRepository;
import com.app.entities.Address;
import com.app.entities.BloodGroup;
import com.app.entities.Status;
import com.app.entities.User;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class StaffServiceImpl implements IStaffService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private AddressRepository addressRepo;
	
	@Override
	public List<?> getDonorList(String bloodGroup,int pinCode,int pageSize,int pageNo){
		
		
		Pageable pageable = PageRequest.of(pageNo, pageSize);
	
		BloodGroup bGroup = BloodGroup.valueOf(bloodGroup);
		
		Page<Address> page=addressRepo.findByPinCode1(pinCode,bGroup,Status.ACTIVE,pageable);
		
		return page.getContent();
	
	}

}
