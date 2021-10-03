package org.perscholas.podcaster.repository;

import org.perscholas.podcaster.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
}