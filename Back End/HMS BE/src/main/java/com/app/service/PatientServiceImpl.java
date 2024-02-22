package com.app.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.AppointmentRepository;
import com.app.dao.PatientRepository;
import com.app.dto.AddressDto;
import com.app.dto.AppointmentDto;
import com.app.dto.PatientDto;
import com.app.dto.UpdateUserDetailsDto;
import com.app.entities.Appointment;
import com.app.entities.HealthPlan;
import com.app.entities.Patient;
import com.app.entities.Role;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class PatientServiceImpl implements IPatientService {

	@Autowired
	private ModelMapper mapper;
	@Autowired
	private PatientRepository patRepo;
	@Autowired
	private AppointmentRepository aptRepo;
	@Autowired
	private UserServiceImpl userService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private IFileHandlingServiceForUserRegistration fileHandlingService;
	@Autowired
	private ITimeSlotCapacityService timeSlotService;
	@Autowired
	private IStaffService staffService;
	@Override
	public PatientDto addPatientDetails(PatientDto patientDto,AddressDto addressDto,MultipartFile imgFile) throws IOException  {
		if(imgFile!=null) {
			log.info(fileHandlingService.savePatientImage(patientDto, imgFile));
		}
		System.out.println("Is image file null "+(imgFile==null));
		//System.out.println("In registration function file path "+imgFile.getOriginalFilename());
		Patient patient=mapper.map(patientDto, Patient.class);
		patient.setPassword(passwordEncoder.encode(patientDto.getPassword()));
		patient.setRole(Role.ROLE_PATIENT);
		Patient persitentPatient= patRepo.save(patient);
		userService.saveAddress(persitentPatient.getId(), addressDto);
		return mapper.map(persitentPatient, PatientDto.class);
	}

	@Override
	public AddressDto getPatientDetails(long patId) {

		Patient patient = patRepo.findById(patId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Patient ID " + patId));
		
		return userService.getAddress(patId);
	}

	
	public AddressDto updatePatientDetails(long patId,UpdateUserDetailsDto patientDto,AddressDto addressDto) {
		Patient patient	= patRepo.findById(patId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Patient ID " + patId));
		
		//update Address details
			AddressDto updatedAddress = userService.updateAddress(patId,addressDto);
			
			// update patient details
			patient.setFirstName(patientDto.getFirstName());
			patient.setLastName(patientDto.getLastName());
			patient.setPhone(patientDto.getPhone());
			patient.setDob(patientDto.getDob());
			patient.setAdharNo(patientDto.getAdharNo());
			patient.setBloodGroup(patientDto.getBloodGroup());
			patient.setGender(patientDto.getGender());
			Patient updatedPatient = patRepo.save(patient);
			return updatedAddress;// updated patient details
	}

	@Override
	public byte[] downloadReport(long aptId) throws IOException {

		// get appointment object by appointment id
		Appointment appointment = aptRepo.findById(aptId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid appointment id"));

		// get the path of report file from data base
		final String path = appointment.getReport();
		// convert the file into byte[] by using Files class method readAllBytes()

		return Files.readAllBytes(Paths.get(path));
	}

	@Override
	public List<Appointment> getReportList(long patId) {
		Patient patient = patRepo.findById(patId).orElseThrow();
		List<Appointment> reportList = aptRepo.findByPatientId(patient);
		System.out.println(reportList);
		if(reportList==null) {
			throw new ResourceNotFoundException("Invalid patient id");
		}
		return reportList;
	}
	
	@Override
	public String bookAppointment(AppointmentDto newAppointment,long patId) {
		if(timeSlotService.dateAndTimeSlotOk(newAppointment.getDate(),newAppointment.getTimeSlot())) {
		timeSlotService.refresh();
		if (timeSlotService.getAvailableCapacity(newAppointment.getDate(), newAppointment.getTimeSlot()) >= 1) {
			Appointment appointment = mapper.map(newAppointment, Appointment.class);
			Patient patient = patRepo.findById(patId)
					.orElseThrow(() -> new ResourceNotFoundException("Invalid Patient ID " + patId));
			appointment.setDoctor(staffService.getStaff(newAppointment.getDocId()));
			appointment.setPatientId(patient);
			Appointment savedAppointment = aptRepo.save(appointment);
			timeSlotService.bookTimeSlot(newAppointment.getDate(), newAppointment.getTimeSlot());
			return "Booked";

		}
		}
		return "Not Booked";

	}
	
	@Override
	public String setPlan(long patId, String plan) {
		
		Patient patient = patRepo.findById(patId).orElseThrow(() -> new ResourceNotFoundException("Invalid Patient ID " + patId));
		log.info("plan in service: "+HealthPlan.valueOf(plan.toUpperCase()));
		patient.setHealthPlan(HealthPlan.valueOf(plan.toUpperCase()));
		patient.setPlanExpiryDate(LocalDate.now().plusYears(1));
		return "Plan added Sucessfully!!";
	}

	@Override
	public List<Appointment> getReportList(long patId, int pageNo,int pageSize) {
		String property1 ="date"; //1st sorting as per date 
		//String property2 ="timeSlot";// 2nd sorting as per time slot
		Pageable request = PageRequest.of(pageNo, pageSize,Direction.DESC, property1);
		Patient patient = patRepo.findById(patId).orElseThrow(() -> new ResourceNotFoundException("Invalid Patient ID " + patId));
		Page<Appointment> page= aptRepo.findByPatientId(patient, request);
		
		return page.getContent();
	}
	
//	@Override
//	public List<Appointment> getAllAppointmentsDetails(int pageNo,int pageSize) {
//		 
//		String property1 ="date"; //1st sorting as per date 
//		String property2 ="timeSlot";// 2nd sorting as per time slot
//					Pageable request = PageRequest.of(pageNo, pageSize,Direction.ASC, property1,property2);
//					//Pageable request = PageRequest.of(pageNo, pageSize);
//					Page<Appointment> page = appointmentRepo.findAll(request);					
//					return page.getContent();
//	}
	
	

	

}