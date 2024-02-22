package com.app.controller;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AddressDto;
import com.app.dto.ApiResponse;
import com.app.dto.LoginDto;
import com.app.dto.PasswordDto;
import com.app.dto.UpdateUserDetailsDto;
import com.app.dto.UserDto;
import com.app.service.IUserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/user")
@Validated
@Slf4j
@CrossOrigin()
public class UserController {
	
	
	@Autowired
	private IUserService userService;
	

	@PostMapping(value = "/register", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<?> addUserDetails(@RequestPart @Valid UserDto userDto,
			@RequestPart(required = false) @Valid AddressDto addressDto) throws IOException {

		System.out.println("user Dto: " + userDto);
		
		log.info("User registraion");
		return new ResponseEntity<>(userService.addUserDetails(userDto, addressDto), HttpStatus.CREATED);

	}

	@PostMapping("/login")
	public ResponseEntity<?> userLogin(@RequestBody LoginDto loginDetails) {
		try {
			System.out.println("email: " + loginDetails.getEmail() + " password :" + loginDetails.getPassword());
			return ResponseEntity.ok(userService.authenticateUser(loginDetails.getEmail(), loginDetails.getPassword()));
		} catch (RuntimeException e) {
			System.out.println("err in get  emp " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);// => // id
		}
	}

	@GetMapping("/{email}")
	public ResponseEntity<?> userLogin(@PathVariable String email) {
		try {
			System.out.println("email from get mapping: " + email);
			return ResponseEntity.ok(userService.getUserDetails(email));
		} catch (RuntimeException e) {
			System.out.println("err in get  emp " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);// => // id
		}
	}
	
	
	
	@PutMapping(value = "/{userId}/update", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<?> updateUserDetails(@PathVariable long userId,
			@RequestPart @Valid UpdateUserDetailsDto userDto,
			@RequestPart(required = false) @Valid AddressDto addressDto) {

		log.info("in updateuserDetails " + userDto);
	
		try {
			return ResponseEntity.ok(userService.updateUserDetails(userId, userDto, addressDto));

		} catch (RuntimeException e) {
			System.out.println("err in update  user " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}

	}

	@PatchMapping("/{userId}/changePassword")
	public ResponseEntity<?> changePassword(@RequestBody @Valid PasswordDto password, @PathVariable long userId) {
		System.out.println("in get changePassword ");
		try {
			System.out.println("password" + password);
			return ResponseEntity.ok(userService.changePassword(userId, password));
		} catch (RuntimeException e) {

			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);// => //
																								//  user " + e);
		}
	}
	
	@DeleteMapping("/{userId}/delete")
	public ResponseEntity<?> removeAccount(@PathVariable long userId) {
		System.out.println("in get removeAccount ");
		try {
			System.out.println("user" + userId);
			return ResponseEntity.ok(userService.removeAccount(userId));
		} catch (RuntimeException e) {

			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);// => //																								//  user " + e);
		}
	}
	
	@PatchMapping("/{userId}/status")
	public ResponseEntity<?> updateStatus(@PathVariable long userId,@RequestBody String status){
	try {	
		return ResponseEntity.ok(userService.updateStatus(userId,status));
	} catch (RuntimeException e) {

		return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);// => //																						//  user " + e);
	}
	
	}
	
	

}
