package com.app.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Category;
import com.app.entities.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long> {
	List<Staff> findByCategory(Category category);
	Page<Staff> findAll(Pageable request);
}
