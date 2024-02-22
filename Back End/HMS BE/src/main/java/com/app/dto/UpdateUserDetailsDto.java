package com.app.dto;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.app.entities.BloodGroup;
import com.app.entities.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UpdateUserDetailsDto {
	
	@NotBlank(message = "First name cannot be blank")
	private String firstName;
	@NotBlank(message = "Last name cannot be blank")
	private String lastName;
	
	private String phone;
	@Email
	@NotBlank(message = "Email Address cannot be blank")
	private String email;
		
	//Image path will not be taken from request hence it is read only
	@JsonProperty(access =Access.READ_ONLY )
	private String image;
	@JsonProperty(access =Access.READ_ONLY )
	private Role role;
	@NotNull(message = "DOB cannot be blank")
	private LocalDate dob;
	
	//Adhar: It should have 12 digits.
	//It should not start with 0 and 1
	//It should not contain any alphabet and special characters.
	@Pattern(regexp = "^[2-9]{1}[0-9]{11}$")
	private String adharNo;
	
	@NotNull(message = "Selecte Gender")
	private String gender;
	
	private BloodGroup bloodGroup;

}
