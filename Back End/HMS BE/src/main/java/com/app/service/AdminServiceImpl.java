package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dao.AdminRepository;
import com.app.dao.StaffRepository;
import com.app.dto.StaffScheduleDto;
import com.app.dto.UserDto;
import com.app.entities.Admin;
import com.app.entities.Role;
import com.app.entities.Staff;
@Service
@Transactional
public class AdminServiceImpl implements IAdminService {

	@Autowired
	AdminRepository adminRepo;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private StaffRepository staffRepo;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Override
	public Admin getAdminByEmail(String email) {
		Admin admin = adminRepo.findByEmail(email).orElseThrow(()->new RuntimeException("Invalid Email!!!"));
	
		// exception to be changed to 'UsernameNotFoundException' in spring security 
		return admin;
	}
	@Override
	public Admin addNewAdmin(UserDto newAdmin) {
		Admin admin=mapper.map(newAdmin,Admin.class);
		admin.setPassword(passwordEncoder.encode(newAdmin.getPassword()));
		admin.setRole(Role.ROLE_ADMIN);
		adminRepo.save(admin);
		return admin;
	}
	@Override
	public List<StaffScheduleDto> getStaffList(int pageNo,int pageSize) {
		
		Pageable request = PageRequest.of(pageNo, pageSize);
		Page<Staff> page=staffRepo.findAll(request);
		
		List<Staff> staffList=page.getContent();
		List<StaffScheduleDto> staffDtoList=new ArrayList<StaffScheduleDto>();
		//staffList.stream().forEach(staff->staffDtoList.add(new StaffScheduleDto(staff.getId(),staff.getFirstName(),staff.getLastName(),staff.getCategory(),staff.getShift())));
		staffList.stream().forEach(staff->staffDtoList.add(mapper.map(staff, StaffScheduleDto.class)));
		
	return staffDtoList;
	}	
	
	@Override
	public List<StaffScheduleDto> getStaffList() {
		
		List<Staff> staffList=staffRepo.findAll();
		List<StaffScheduleDto> staffDtoList=new ArrayList<StaffScheduleDto>();
		//staffList.stream().forEach(staff->staffDtoList.add(new StaffScheduleDto(staff.getId(),staff.getFirstName(),staff.getLastName(),staff.getCategory(),staff.getShift())));
		staffList.stream().forEach(staff->staffDtoList.add(mapper.map(staff, StaffScheduleDto.class)));
		
	return staffDtoList;
	}	

}
