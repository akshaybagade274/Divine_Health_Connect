package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.entities.BloodGroup;
import com.app.service.IStaffService;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin("http://localhost:7070")
@Slf4j
@RequestMapping("/staff")
public class StaffController {
	
	@Autowired
	private IStaffService staffService;
	
	@GetMapping("/donorList")
	public ResponseEntity<?> getDonorList(@RequestParam String bGroup,@RequestParam int pinCode,
			@RequestParam int pageSize,@RequestParam int pageNo){
		try {
			log.info("in staff controller -->  bGroup="+bGroup+"pinCode="+pinCode+"pageSize="+pageSize+"pageNo="+pageNo);
			
			return ResponseEntity.ok(staffService.getDonorList(bGroup, pinCode, pageSize, pageNo));
		}catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse("Request failed: "+e),HttpStatus.BAD_REQUEST);
		}

	}
	
}
