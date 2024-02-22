package com.app.controller;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AddressDto;
import com.app.dto.ApiResponse;
import com.app.dto.PasswordDto;
import com.app.dto.UpdateUserDetailsDto;
import com.app.entities.Staff;
import com.app.service.IBDSClientService;
import com.app.service.IStaffService;
import com.app.service.IUserService;
import com.app.service.ImageHandlingService;

import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/staff")
@Validated
@Slf4j
public class StaffController {

	// dep : service layer i/f
	@Autowired
	private IStaffService staffService;
	@Autowired
	private ImageHandlingService imageService;
	@Autowired
	private IUserService userService;
	
	@Autowired
	private IBDSClientService bdsService;

	// add REST API endpoint to ret list of all Appointments
	
	@GetMapping("/{staffId}")
	public ResponseEntity<?> getStaffDetails(@PathVariable long staffId) {
		System.out.println("in get patient " + staffId);
		try {
			return ResponseEntity.ok(staffService.getStaffDetails(staffId));
		} catch (RuntimeException e) {
			System.out.println("err in get  emp " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);// => // id
		}
	}
	
	@PutMapping(value = "/{staffId}/update" , consumes = { MediaType.MULTIPART_FORM_DATA_VALUE } )
	public ResponseEntity<?> updatePatientDetails(@PathVariable long staffId, @RequestPart @Valid UpdateUserDetailsDto staffDto,@RequestPart @Valid AddressDto addressDto) {

		
		try {
			return ResponseEntity.ok(staffService.updateStaffDetails(staffId, staffDto,addressDto));
			
		} catch (RuntimeException e) {
			System.out.println("err in update  patient " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);

		}

	}
	
	@PatchMapping("/{staffId}/changePassword")
	public ResponseEntity<?> changePassword(@RequestBody @Valid PasswordDto password, @PathVariable long staffId) {
		System.out.println("in get subscribePlan ");
		try {
			System.out.println("password" + password);
			return ResponseEntity.ok(userService.changePassword(staffId, password));
		} catch (RuntimeException e) {

			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);// =>																					//  patient " + e);
		}
	}
	
	@GetMapping("/showAppointments")
	public ResponseEntity<?> paginationWithSorting(@RequestParam int page,@RequestParam int pageSize) {
		System.out.println("in list appointments");
		return ResponseEntity.ok(staffService.getAllAppointmentsDetails(page,pageSize));
	}

	@PostMapping(value = "/uploadReport/{aptId}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<?> uploadReport(@PathVariable long aptId, @RequestParam MultipartFile reportFile)
			throws IOException {

		return ResponseEntity.ok(staffService.saveReport(aptId, reportFile));
	}

	@PostMapping("/{staffId}/uploadImage")
	public ResponseEntity<?> uploadImage(@PathVariable long staffId, @RequestParam MultipartFile imgFile)
			throws IOException {
		Staff staff = staffService.getStaff(staffId);
		imageService.saveImage(staffId, imgFile);
		return ResponseEntity.ok(staff);
	}
	
	@GetMapping(value = "/{staffId}/image", produces = { MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_GIF_VALUE,
			MediaType.IMAGE_PNG_VALUE })
	public ResponseEntity<?> getImage(@PathVariable long staffId) throws IOException {

		return ResponseEntity.ok(imageService.restoreImage(staffId));
	}
	
	@GetMapping("/appointment/timeslots")
	public ResponseEntity<?> getAppointmentOverview(){
		
		return ResponseEntity.ok(staffService.getTimeSlots());
	}
	
	@GetMapping("/appointments")
	public ResponseEntity<?> getAppointments(@RequestParam int page,@RequestParam int pageSize){
		return ResponseEntity.ok(staffService.getTodayAndTomorrowsAppointments(page, pageSize));
	}
	
	@GetMapping("/appointments/reportUpload")
	public ResponseEntity<?> getAppointmentListForReportUpload(@RequestParam int page,@RequestParam int pageSize){
		return ResponseEntity.ok(staffService.getAppointmentsForReportUpload(page, pageSize));
	}
	
	@GetMapping("/showCurrentAppointments")
	public ResponseEntity<?> getAllAppointments2Days(){
		return ResponseEntity.ok(staffService.getAllTodayAndTomorrowsAppointments());
		
	}
	
	@GetMapping("/donorList")
	public ResponseEntity<?> getDonorList(@RequestParam String bGroup,@RequestParam int pinCode,
					@RequestParam int pageSize,@RequestParam int pageNo){
		try {
			log.info("in BDSClientServiceImpl -->  bGroup="+bGroup+"pinCode="+pinCode+"pageSize="+pageSize+"pageNo="+pageNo);
			return ResponseEntity.ok(bdsService.getDonorList(bGroup, pinCode, pageSize, pageNo));
		}catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse("Request failed: "+e),HttpStatus.BAD_REQUEST);
		}
		
	}
		

}
