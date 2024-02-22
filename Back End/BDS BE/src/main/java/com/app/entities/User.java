package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "user")
@Table(name = "users")
public class User extends BaseEntity {
	@Column(name = "first_name", length = 20)
	private String firstName;
	@Column(name = "last_name", length = 20)
	private String lastName;
	@Column(length = 30)
	private String phone;
	@Column(length = 30, unique = true,nullable = false)
	private String email;
	@Column(length = 300, nullable = false)
	private String password;
	@Column(name="dob")
	private LocalDate dob;
	private String gender;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "blood_group")
	private BloodGroup bloodGroup;
	
	@Column(name="adhar_number",length = 12)
	private String adharNo;
	
	@Enumerated(EnumType.STRING)
	private Status status;
	
}
