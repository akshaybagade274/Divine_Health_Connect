package com.app.dto;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.app.entities.BloodGroup;
import com.app.entities.HealthPlan;
import com.app.entities.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PatientDto {
	@JsonProperty(access = Access.READ_ONLY)
	private long id;
	@NotBlank(message = "First name cannot be blank")
	private String firstName;
	@NotBlank(message = "Last name cannot be blank")
	private String lastName;
	// optional
	private String phone;

	@Email
	@NotBlank(message = "Email Address cannot be blank")
	private String email;

	/*
	 * Minimum eight, max 15 characters, at least one uppercase letter, one
	 * lowercase letter, one number and one special character
	 */
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%#*?&])[A-Za-z\\d@$!%*?&]{8,15}$", message = "Password must be atleast 8 ch and max 15 ch and must contain 1 upper case, 1 lower case letter,1 special character")

	// To avoid serialization of password, password cannot be sent in response
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	@NotNull(message = "DOB cannot be blank")
	private LocalDate dob;
	// Adhar: It should have 12 digits.
	// It should not start with 0 and 1
	// It should not contain any alphabet and special characters.
	@Pattern(regexp = "^[2-9]{1}[0-9]{11}$")
	private String adharNo;
	
	@NotNull(message = "Selecte Gender")
	private String gender;
	
	private BloodGroup bloodGroup;

	// Image path will not be taken from request hence it is read only
	@JsonProperty(access = Access.READ_ONLY)
	private String imagePath;

	@JsonProperty(access = Access.READ_ONLY)
	private HealthPlan healthPlan;
	
	@JsonProperty(access = Access.READ_ONLY)
	private Role role;
	
}
