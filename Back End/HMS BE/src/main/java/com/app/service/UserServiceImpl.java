package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.AddressRepository;
import com.app.dao.StaffRepository;
import com.app.dao.UserRepository;
import com.app.dto.AddressDto;
import com.app.dto.PasswordDto;
import com.app.entities.Address;
import com.app.entities.AppointmentTimeSlot;
import com.app.entities.Category;
import com.app.entities.Staff;
import com.app.entities.User;
@Service
@Transactional
public class UserServiceImpl implements IUserService {

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private AddressRepository addressRepo;
	@Autowired
	private StaffRepository staffRepo;
	@Autowired
	private PasswordEncoder passEnco;
	
	@Autowired
	private TimeSlotCapacityServiceImpl timeSlotService;
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public String saveAddress(long userId, AddressDto addressDto) {
		User user=userRepo.getReferenceById(userId);
		Address addr=mapper.map(addressDto,Address.class);
		addr.setUser(user);
		addressRepo.save(addr);
		return "Address Saved Scussefully!!";	
	}
	
	@Override
	public List<AppointmentTimeSlot> getTimeSlots() {
		timeSlotService.refresh();
		return timeSlotService.getTimeSlots();
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
	public String changePassword(long userId, PasswordDto password) {
		User user = userRepo.findById(userId)
				.orElseThrow(()->new ResourceNotFoundException("user not found "+userId));
		String encode = passEnco.encode(password.getPassword());
		user.setPassword(encode);
		return "Password changed successfully";
	}

	@Override
	public List<Staff> getDoctorsList() {
		List<Staff> doctorsList = staffRepo.findByCategory(Category.DOCTOR);
		return doctorsList;
	}
	
	
	

}
