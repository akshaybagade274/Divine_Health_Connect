package com.app.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.app.entities.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class AddressDto {
	@JsonProperty(access = Access.READ_ONLY)
	private User user;
	@NotBlank(message = "Addres Line 1 cannot be blank")
	private String addressLine1;
	@NotBlank(message = "Addres Line 2 cannot be blank")
	private String addressLine2;
	@NotBlank(message = "City cannot be blank")
	private String city;
	@NotBlank(message = "State cannot be blank")
	private String state;
	@NotBlank(message = "Country cannot be blank")
	private String country;
	@NotNull(message = "Pin Code cannot be blank")
	private int pinCode;
	

}
