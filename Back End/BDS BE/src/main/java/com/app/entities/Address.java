package com.app.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "address_table")
//@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class Address extends BaseEntity {
	@Column(length = 100, name = "address_Line1")
	private String addressLine1;
	@Column(length = 100, name = "address_Line2")
	private String addressLine2;
	@Column(length = 20)
	private String city;
	@Column(length = 20)
	private String state;
	@Column(length = 20)
	private String country;
	@Column(name="pin_code")
	private int pinCode;
	// one to one uni dir asso between User <----- Address
	// parent side : User , child : address
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", nullable = false)
	@MapsId // To tell hibernate , Address wil NOT have a separate PK , it will be shared
			// with users table n it will acts as FK referencing PK of the users table
	private User user;
}
