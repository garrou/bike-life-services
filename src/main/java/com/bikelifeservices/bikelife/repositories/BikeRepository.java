package com.bikelifeservices.bikelife.repositories;

import com.bikelifeservices.bikelife.entities.Bike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BikeRepository extends JpaRepository<Bike, Long> {


}
