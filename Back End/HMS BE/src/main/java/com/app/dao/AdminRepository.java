package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

	Optional<Admin> findByEmail(String email);

}
