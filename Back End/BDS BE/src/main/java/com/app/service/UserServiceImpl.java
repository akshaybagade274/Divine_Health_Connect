package com.app.service;

import java.time.LocalDate;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.AddressRepository;
import com.app.dao.UserRepository;
import com.app.dto.AddressDto;
import com.app.dto.PasswordDto;
import com.app.dto.UpdateUserDetailsDto;
import com.app.dto.UserDto;
import com.app.entities.Address;
import com.app.entities.Status;
import com.app.entities.User;
@Service
@Transactional
public class UserServiceImpl implements IUserService {

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private AddressRepository addressRepo;
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public UserDto addUserDetails(UserDto userDto, AddressDto addressDto) {
		
		if(userDto.getDob().isBefore(LocalDate.now().minusYears(18))) {
			User user = mapper.map(userDto, User.class);
			
			User persitentUser= userRepo.save(user);
			user.setStatus(Status.ACTIVE);	
			//saveAddress() 
			Address addr = mapper.map(addressDto,Address.class);
			addr.setUser(persitentUser);

			
			Address savedAddress = addressRepo.save(addr);
			return mapper.map(persitentUser, UserDto.class);
		}			
		else 
			throw new RuntimeException("User should be 18+");
		
	}
	
	
	@Override
	public AddressDto authenticateUser(String email, String password) {
		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Email Id " + email));
		if (user.getPassword().equals(password)) {
		Address address=addressRepo.findById(user.getId()).orElseThrow();
			return mapper.map(address, AddressDto.class);
		}
			
		else
			throw new RuntimeException("invalid password");

	}
	
	@Override
	public AddressDto getUserDetails(String email) {
		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Email Id " + email));
		
		Address address=addressRepo.findById(user.getId()).orElseThrow();
		
			return mapper.map(address, AddressDto.class);
		}

	
	
	
	
	@Override
	public AddressDto updateUserDetails(long userId,UpdateUserDetailsDto userDto,AddressDto addressDto) {
		
	if(userDto.getDob().isBefore(LocalDate.now().minusYears(18))) {
		
		User user	= userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Patient ID " + userId));
		
		//update Address details
			AddressDto updatedAddress = updateAddress(userId,addressDto);
			
			// update patient details
			user.setFirstName(userDto.getFirstName());
			user.setLastName(userDto.getLastName());
			user.setPhone(userDto.getPhone());
			user.setDob(userDto.getDob());
			user.setAdharNo(userDto.getAdharNo());
			user.setBloodGroup(userDto.getBloodGroup());
			user.setGender(userDto.getGender());
			 userRepo.save(user);
			return updatedAddress;// updated patient details
	}
			else 
				throw new RuntimeException("User should be 18+");
	}

	public AddressDto updateAddress(long patId, AddressDto addressDto) {
		Address address =addressRepo.findById(patId).orElseThrow();
		address.setAddressLine1(addressDto.getAddressLine1());
		address.setAddressLine2(addressDto.getAddressLine2());
		address.setCity(addressDto.getCity());
		address.setCountry(addressDto.getCountry());
		address.setPinCode(addressDto.getPinCode());
		address.setState(addressDto.getState());
		
		return mapper.map(addressRepo.save(address), AddressDto.class) ;
	}

	@Override
	public AddressDto getAddress(long pathId) {
		 Address address = addressRepo.findById(pathId).orElseThrow();
		return mapper.map(address, AddressDto.class);
	}

	@Override
	public String changePassword(long userId, PasswordDto passwordDto) {
		User user = userRepo.findById(userId)
				.orElseThrow(()->new ResourceNotFoundException("user not found "+userId));
		user.setPassword(passwordDto.getPassword());
		return "Password changed successfully";
	}
	
	@Override
	public String removeAccount(long userId) {
		Address userAdd = addressRepo.findById(userId)
				.orElseThrow(()->new ResourceNotFoundException("user not found "+userId));
		addressRepo.delete(userAdd);
		
		return "Account removed successfully";
	}


	@Override
	public String updateStatus(long userId,String status) {
	User user=	userRepo.findById(userId)
				.orElseThrow(()->new ResourceNotFoundException("user not found "+userId));
		
	user.setStatus(Status.valueOf(status.toUpperCase()));
	
		userRepo.save(user);
		return "status updated successfully;";
	}


	
	
	
	

}
