package com.app.controller;

import java.io.IOException;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AddressDto;
import com.app.dto.ApiResponse;
import com.app.dto.PasswordDto;
import com.app.dto.StaffDto;
import com.app.dto.StaffScheduleDto;
import com.app.dto.UserDto;
import com.app.entities.Staff;
import com.app.service.IAdminService;
import com.app.service.IStaffService;
import com.app.service.IUserService;
import com.app.service.ImageHandlingService;

@RestController
@RequestMapping("/admin")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

	@Autowired
	private IAdminService adminService;
	@Autowired
	private IStaffService staffService;
	@Autowired
	private ImageHandlingService imageService;
	@Autowired
	private IUserService userService;
	
	@PostMapping("/add/admin")
	public ResponseEntity<?> addAdmin(@RequestBody @Valid UserDto newAdmin) {
		return new ResponseEntity<>(adminService.addNewAdmin(newAdmin), HttpStatus.CREATED);
	}

	@PostMapping(value = "/add/staff", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<?> addStaff(@RequestPart @Valid StaffDto staffDto, @RequestPart @Valid AddressDto addressDto,
			@RequestPart(required = false) MultipartFile imgFile,
			@RequestPart(required = false) MultipartFile degreeFile) throws IOException {
		Staff detachedStaff = staffService.addStaff(staffDto, imgFile, addressDto, degreeFile);
		return new ResponseEntity<>(detachedStaff, HttpStatus.CREATED);
	}

	@GetMapping("/staffSchedule")
	public ResponseEntity<?> getStaffList(@RequestParam int page,@RequestParam int pageSize) {
		return ResponseEntity.ok(adminService.getStaffList(page,pageSize));
	}

	@PostMapping("/updateShifts")
	public ResponseEntity<?> updateStaffShits(@RequestBody List<StaffScheduleDto> list) {

		staffService.updateShifts(list);

		return ResponseEntity.ok(adminService.getStaffList());
	}
	
	@GetMapping(value = "{adminId}/image", produces = { MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_GIF_VALUE,
			MediaType.IMAGE_PNG_VALUE })
	public ResponseEntity<?> getImage(@PathVariable long adminId) throws IOException {

		return ResponseEntity.ok(imageService.restoreImage(adminId));
	}

	
	@PostMapping(value="/{adminId}/image",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<?> uploadImage(@PathVariable long adminId,@RequestBody MultipartFile imgFile ) throws IOException{
		if(imgFile!=null) {
		System.out.println("Img name in admin controller "+imgFile);
		imageService.saveImage(adminId, imgFile);
		return new ResponseEntity<>(new ApiResponse("Image Updated successfully"), HttpStatus.ACCEPTED);
		}
		return new ResponseEntity<>(new ApiResponse("Null Image"), HttpStatus.BAD_REQUEST);
	}
	
	@PatchMapping("/{adminId}/changePassword")
	public ResponseEntity<?> changePassword(@RequestBody @Valid PasswordDto password, @PathVariable long adminId) {
		System.out.println("in get subscribePlan ");
		try {
			System.out.println("password" + password);
			return ResponseEntity.ok(userService.changePassword(adminId, password));
		} catch (RuntimeException e) {

			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);// =>																					//  patient " + e);
		}
	}

}
