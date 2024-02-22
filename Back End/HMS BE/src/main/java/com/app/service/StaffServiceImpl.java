package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.AppointmentRepository;
import com.app.dao.StaffRepository;
import com.app.dto.AddressDto;
import com.app.dto.StaffDto;
import com.app.dto.StaffScheduleDto;
import com.app.dto.UpdateUserDetailsDto;
import com.app.entities.Appointment;
import com.app.entities.AppointmentTimeSlot;
import com.app.entities.Role;
import com.app.entities.Shift;
import com.app.entities.Staff;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
@Transactional
public class StaffServiceImpl implements IStaffService {
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private StaffRepository staffRepo;
	@Autowired
	private IUserService userService;
	@Autowired
	private IFileHandlingServiceForUserRegistration fileHandlingService;
	@Autowired 
	private PasswordEncoder passwordEncoder;
	@Autowired
	private ITimeSlotCapacityService timeSlotService;
	@Value("${file.upload.reports}")
	private String folderLocation;
	
	@PostConstruct
	public void anyInit() {
		// chk if folder exists --if not create one !
		// java.io.File => represents abstract path to a file /folder
		File folder = new File(folderLocation);
		if (!folder.exists()) {
			folder.mkdirs();
			log.info("folder created....");
		} else
			log.info("folder alrdy exists !");
	} 
	@Override
	public Staff addStaff(StaffDto staffDto,MultipartFile imgFile,AddressDto addressDto,MultipartFile degreeFile) throws IOException {
		if(imgFile!=null)
			log.info(fileHandlingService.saveStaffImage(staffDto, imgFile));
		if(degreeFile!=null)
			log.info(fileHandlingService.saveStaffDegreeCertificate(staffDto, degreeFile));
		Staff transiemtStaff=mapper.map(staffDto, Staff.class);
		transiemtStaff.setPassword(passwordEncoder.encode(staffDto.getPassword()));
		transiemtStaff.setRole(Role.ROLE_STAFF);
		Staff staff = staffRepo.save(transiemtStaff);
		userService.saveAddress(staff.getId(), addressDto);
		return staff;
	}
	
	@Override
	public Staff getStaff(long userId) {
		
		Staff staff=staffRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("Staff is not found"));
		return staff;
	}

	@Override
	public String updateShifts(List<StaffScheduleDto> staffList) {
		staffList.forEach(s->updateShift(s.getId(),s.getShift()));
		return "Shifts updated";
	}
	public void updateShift(long staffId,Shift shift) {
		Staff staff=staffRepo.findById(staffId).orElseThrow();
		staff.setShift(shift);
		staffRepo.save(staff);
	}
	
	@Autowired
	private AppointmentRepository appointmentRepo;
	private List<Appointment> List;
	
	
	@Override
	public List<Appointment> getAllAppointmentsDetails(int pageNo,int pageSize) {
		 
		String property1 ="date"; //1st sorting as per date 
		String property2 ="timeSlot";// 2nd sorting as per time slot
					Pageable request = PageRequest.of(pageNo, pageSize,Direction.ASC, property1,property2);
					//Pageable request = PageRequest.of(pageNo, pageSize);
					Page<Appointment> page = appointmentRepo.findAll(request);					
					return page.getContent();
	}
	
	@Override
	public List<Appointment> getTodayAndTomorrowsAppointments(int pageNo,int pageSize) {
		String property1 ="date"; //1st sorting as per date 
		String property2 ="timeSlot";// 2nd sorting as per time slot
		Pageable request = PageRequest.of(pageNo, pageSize,Direction.ASC, property1,property2);
		Page<Appointment> page=appointmentRepo.findByDateBetween(LocalDate.now(), LocalDate.now().plusDays(1),request);
		return page.getContent();
	}
	@Override
	public List<Appointment> getAppointmentsForReportUpload(int pageNo, int pageSize) {
		String property1 ="date"; //1st sorting as per date 
		String property2 ="timeSlot";// 2nd sorting as per time slot
		Pageable request = PageRequest.of(pageNo, pageSize,Direction.ASC, property1,property2);
		Page<Appointment> page=appointmentRepo.findByDateBetweenAndReport(LocalDate.now().minusDays(2), LocalDate.now(),null,request);
		return page.getContent();
	}


	@Override
	public AddressDto getStaffDetails(long staffId) {
		Staff staff=staffRepo.findById(staffId)
				.orElseThrow(()-> new ResourceNotFoundException("Staff is not found"));
		
		return userService.getAddress(staffId);
		
	}
	
	
	public AddressDto updateStaffDetails(long staffId,UpdateUserDetailsDto staffDto,AddressDto addressDto) {
		Staff staff	= staffRepo.findById(staffId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Patient ID " + staffId));
		
		//update Address details
			AddressDto updatedAddress = userService.updateAddress(staffId,addressDto);
			
			// update patient details
			staff.setFirstName(staffDto.getFirstName());
			staff.setLastName(staffDto.getLastName());
			staff.setPhone(staffDto.getPhone());
			staff.setDob(staffDto.getDob());
			staff.setAdharNo(staffDto.getAdharNo());
			staff.setBloodGroup(staffDto.getBloodGroup());
			staff.setGender(staffDto.getGender());
			Staff updatedStaff = staffRepo.save(staff);
			return updatedAddress;// updated patient details
	}

	
	
	@Override
	public String saveReport(long aptId, MultipartFile reportFile) throws IOException {
		//get appointment object by appointment id
		Appointment appointment = appointmentRepo.findById(aptId)
				.orElseThrow(()->new ResourceNotFoundException("Invalid Appointment id"));
		
		//Absolute path foe save report file to in database
		String path=folderLocation+File.separator+reportFile.getOriginalFilename()+aptId;
		
		//save the path in database 
		appointment.setReport(path);
		
		//copy the report file in server side folder.
		Files.copy(reportFile.getInputStream(), Paths.get(path), StandardCopyOption.REPLACE_EXISTING);
		
		return "Report uploaded Succefully";
	}
	@Override
	public List<AppointmentTimeSlot> getTimeSlots() {
		
		return timeSlotService.getTimeSlots();
	}
	@Override
	public java.util.List<Appointment> getAllTodayAndTomorrowsAppointments() {
		
		return (appointmentRepo.findByDateBetween(LocalDate.now(), LocalDate.now().plusDays(1))).stream().
				sorted((a1,a2)->a1.getDate().compareTo(a2.getDate())).collect(Collectors.toList());
				
		
		
	}
		
}
