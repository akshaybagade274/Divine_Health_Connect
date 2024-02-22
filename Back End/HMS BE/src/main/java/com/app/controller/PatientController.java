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
import com.app.dto.AppointmentDto;
import com.app.dto.PasswordDto;
import com.app.dto.PatientDto;
import com.app.dto.UpdateUserDetailsDto;
import com.app.service.IPatientService;
import com.app.service.IUserService;
import com.app.service.ImageHandlingService;

import lombok.extern.slf4j.Slf4j;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/patient")
@Slf4j
@Validated

public class PatientController {

	@Autowired
	private IPatientService patientService;
	
	@Autowired
	private ImageHandlingService imageService;
	
	@Autowired
	private IUserService userService;

	// register patient here
	
	@PostMapping(value = "/register" , consumes = { MediaType.MULTIPART_FORM_DATA_VALUE } )
	public ResponseEntity<?> addPatientDetails(@RequestPart @Valid PatientDto patientDto ,@RequestPart(required = false) @Valid AddressDto addressDto,
			@RequestPart(required = false) MultipartFile imgFile) throws IOException {
		System.out.println("is image null "+(imgFile==null));
		System.out.println("patient Dto: "+patientDto);
		PatientDto patient = patientService.addPatientDetails(patientDto, addressDto, imgFile);
		log.info("Patient registraion");
		return new ResponseEntity<>(patient, HttpStatus.CREATED);
		
	}

	@GetMapping("/{patId}")
	public ResponseEntity<?> getPatientDetails(@PathVariable long patId) {
		System.out.println("in get patient " + patId);
		try {
			return ResponseEntity.ok(patientService.getPatientDetails(patId));
		} catch (RuntimeException e) {
			System.out.println("err in get  emp " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);// => // id
		}
	}

	// add REST API endpoint to update existing patient details
	
	@PutMapping(value = "/{patId}/update" , consumes = { MediaType.MULTIPART_FORM_DATA_VALUE } )
	public ResponseEntity<?> updatePatientDetails(@PathVariable long patId, @RequestPart @Valid UpdateUserDetailsDto patientDto,@RequestPart(required = false) @Valid AddressDto addressDto) {

		System.out.println("in update emp " + patientDto);
		try {
			return ResponseEntity.ok(patientService.updatePatientDetails(patId, patientDto,addressDto));
			
		} catch (RuntimeException e) {
			System.out.println("err in update  patient " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);

		}

	}

	@PatchMapping("/{patId}/changePassword")
	public ResponseEntity<?> changePassword(@RequestBody @Valid PasswordDto password, @PathVariable long patId) {
		System.out.println("in get subscribePlan ");
		try {
			System.out.println("password" + password);
			return ResponseEntity.ok(userService.changePassword(patId, password));
		} catch (RuntimeException e) {

			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);// =>																					//  patient " + e);
		}
	}
	
	@GetMapping("{patId}/reports") 
	public ResponseEntity<?> getReportList(@PathVariable long patId, @RequestParam int page,@RequestParam int pageSize) {
		try {
			return ResponseEntity.ok(patientService.getReportList(patId,page,pageSize));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}
	

	@GetMapping(value = "/report/{aptId}", produces = { MediaType.APPLICATION_PDF_VALUE })
	public ResponseEntity<?> downloadReport(@PathVariable long aptId) throws IOException {

		return ResponseEntity.ok(patientService.downloadReport(aptId));

	}

	@PostMapping("/{patId}/bookAppointment")
	public ResponseEntity<?> bookAppointment(@RequestBody @Valid AppointmentDto newAppointment,
			@PathVariable long patId) {
		System.out.println("in book appointment ");
		String appointmentStatus = patientService.bookAppointment(newAppointment, patId);
		if(appointmentStatus.equalsIgnoreCase("Booked"))
		return new ResponseEntity<>((new ApiResponse(appointmentStatus)),HttpStatus.ACCEPTED);
	
			return new ResponseEntity<>(new ApiResponse(appointmentStatus), HttpStatus.EXPECTATION_FAILED);
	}

	@PatchMapping("/{patId}/subscribePlan")
	public ResponseEntity<?> subscribePlan(@RequestParam String plan, @PathVariable long patId) {
		log.info("In get subscribePlan ");
		try {
			log.info("Plan" + plan);
			return ResponseEntity.ok(patientService.setPlan(patId, plan));
		} catch (RuntimeException e) {

			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);// =>																					//  patient " + e);
		}
	}
	
	@GetMapping(value = "/{patId}/image", produces = { MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_GIF_VALUE,
			MediaType.IMAGE_PNG_VALUE })
	public ResponseEntity<?> getImage(@PathVariable long patId) throws IOException {

		return ResponseEntity.ok(imageService.restoreImage(patId));
	}
	
	@PostMapping(value = "/{patId}/image", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<?> uploadImage(@PathVariable long patId, @RequestBody MultipartFile imgFile)
			throws IOException {
		try {
			return ResponseEntity.ok(imageService.saveImage(patId, imgFile));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}
	
	
	
	
}
