package com.bikelifeservices.bikelife.services;

import com.bikelifeservices.bikelife.entities.Bike;
import com.bikelifeservices.bikelife.repositories.BikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BikeService {

    private final BikeRepository bikeRepository;

    @Autowired
    public BikeService(BikeRepository bikeRepository) {
        this.bikeRepository = bikeRepository;
    }

    public List<Bike> getBikes() {
        return bikeRepository.findAll();
    }

    public Bike createBike(Bike bike) {
        return bikeRepository.save(bike);
    }

    public void deleteBike(long id) {
        boolean exists = bikeRepository.existsById(id);

        if (!exists) {
            throw new IllegalArgumentException(String.format("Bike's id : %d does not exists", id));
        }

        bikeRepository.deleteById(id);
    }
}