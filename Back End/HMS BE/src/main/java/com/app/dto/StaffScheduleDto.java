package com.app.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.app.entities.Category;
import com.app.entities.Shift;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class StaffScheduleDto {
	@NotNull(message = "Id is null")
	private long id;
	@NotBlank(message = "First name cannot be blank")
	private String firstName;
	@NotBlank(message = "Last name cannot be blank")
	private String lastName;
	@NotNull(message = "Shift details cannot be blank")
	private Shift shift;
	@NotNull(message = "Category details cannot be blank")
	private Category category;
	}
