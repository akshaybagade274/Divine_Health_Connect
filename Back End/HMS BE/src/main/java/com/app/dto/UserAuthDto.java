package com.app.dto;

import java.time.LocalDate;

import com.app.entities.BloodGroup;
import com.app.entities.Role;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserAuthDto {
	
	private long id;
	
	private String firstName;

	private String lastName;
	
	private String phone;

	private String email;
	
	private Role role;
	
	private LocalDate dob;
	
	private BloodGroup bloodGroup;
		
	private String gender;

	private String adharNo;

}
