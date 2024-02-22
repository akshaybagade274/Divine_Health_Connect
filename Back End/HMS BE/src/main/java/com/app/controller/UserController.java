package com.app.controller;

import java.util.Collection;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AuthResp;
import com.app.dto.LoginDto;
import com.app.dto.UserAuthDto;
import com.app.entities.Role;
import com.app.entities.User;
import com.app.jwt_utils.JwtUtils;
import com.app.service.CustomSecurityUserDetails;
import com.app.service.ITimeSlotCapacityService;
import com.app.service.IUserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
@Validated
@Slf4j

public class UserController {
	@Autowired
	private AuthenticationManager manager;
	@Autowired
	private JwtUtils utils;
	@Autowired
	private IUserService userService; 
	@Autowired
	private ITimeSlotCapacityService timeSlotService;
	@Autowired 
	private ModelMapper mapper; 
	
	private Collection<? extends GrantedAuthority> authorities;
	
	@PostMapping("/login")
	public ResponseEntity<?> loginAndCreateToken(@RequestBody @Valid LoginDto request) {
		log.info(request.getEmail());
		log.info(request.getPassword());
		

		// Store incoming user details(not yet validated) into Authentication object
		// Authentication i/f ---> implemented by UserNamePasswordAuthToken
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.getEmail(),
				request.getPassword());
		log.info("auth token " + authToken);
		try {
			// authenticate the credentials
			Authentication authenticatedDetails = manager.authenticate(authToken);
			log.info("auth token again " + authenticatedDetails);
			User Authuser= ((CustomSecurityUserDetails)authenticatedDetails.getPrincipal()).getUserDetails();
			UserAuthDto user=mapper.map(Authuser, UserAuthDto.class);
			Role userRole = ((CustomSecurityUserDetails)authenticatedDetails.getPrincipal()).getRole();
			// => auth succcess
			
			timeSlotService.refresh();
			
			return ResponseEntity.ok(new AuthResp("Auth successful!", utils.generateJwtToken(authenticatedDetails),userRole,user));
		} catch (BadCredentialsException e) { // lab work : replace this by a method in global exc handler
			// send back err resp code
			System.out.println("err " + e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}
	}
	
	@GetMapping("/timeslotsAvailability")
	public ResponseEntity<?> getTimeSlots(){
			
		return new ResponseEntity<>(userService.getTimeSlots(),HttpStatus.OK);
	}
	
	@GetMapping("/doctorsList")
	public ResponseEntity<?> getDoctorsList(){
		
		return new ResponseEntity<>(userService.getDoctorsList(),HttpStatus.OK);
	}

	
	
}
