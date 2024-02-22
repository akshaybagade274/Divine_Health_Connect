package com.app.service;

import com.app.dto.AddressDto;
import com.app.dto.PasswordDto;
import com.app.dto.UpdateUserDetailsDto;
import com.app.dto.UserDto;

public interface IUserService {
	
	public UserDto addUserDetails(UserDto userDto, AddressDto addressDto) /* throws IOException */;
	public AddressDto authenticateUser(String email, String password);
	public String changePassword(long userId, PasswordDto password); 
	public AddressDto updateUserDetails(long userId,UpdateUserDetailsDto userDto,AddressDto addressDto);
	public AddressDto updateAddress(long patId, AddressDto addressDto);
	public AddressDto getAddress(long pathId);
	public String removeAccount(long userId);
	public String updateStatus(long userId,String status);
	public AddressDto getUserDetails(String email);

	
	
}
