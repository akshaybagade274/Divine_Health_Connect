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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;
import com.app.dto.ApplicationDto;
import com.app.service.IApplicationService;



@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/careers")
@Validated

public class ApplicationsController {
	@Autowired
	private IApplicationService applnService;
	
	@PostMapping(value="/newApplication",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<?> newApplication(@RequestPart @Valid ApplicationDto applnDto,@RequestPart MultipartFile resumeFile) throws IOException{
		applnService.saveApplication(applnDto, resumeFile);
		return new ResponseEntity<>(new ApiResponse("You have Applied Successfully!!"),HttpStatus.CREATED);
	}
	
	@GetMapping("/applicantsList")
	public ResponseEntity<?> getApplicantsList(@RequestParam int page,@RequestParam int pageSize){
		return ResponseEntity.ok(applnService.getAllApplications(page,pageSize));
	}
	
	@GetMapping(value="/{applnId}/resume",produces = {MediaType.APPLICATION_PDF_VALUE})
	public ResponseEntity<?> downloadResume(@PathVariable long applnId) throws IOException{
		return ResponseEntity.ok(applnService.downloadResume(applnId));
	}
	
	@PostMapping("/{applnId}/updateStatus")
	public ResponseEntity<?> updateApplnStatus(@PathVariable long applnId){
		applnService.updateStatus(applnId);
		return ResponseEntity.ok(new ApiResponse("Status Marked as Seen"));
	}
}
