package com.bikelifeservices.bikelife.repositories;

import com.bikelifeservices.bikelife.entities.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    @Query("SELECT m FROM member m WHERE m.email = ?1")
    Optional<Member> findByEmail(String email);
}
