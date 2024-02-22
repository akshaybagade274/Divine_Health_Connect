package com.app.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entities.Address;
import com.app.entities.BloodGroup;
import com.app.entities.Status;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

	@Query("select a from Address a inner join  a.user u where a.pinCode=?1 and u.bloodGroup=?2 and u.status=?3")
	Page<Address> findByPinCode1(int pinCode,BloodGroup bloodGroup,Status status,Pageable page);


}
