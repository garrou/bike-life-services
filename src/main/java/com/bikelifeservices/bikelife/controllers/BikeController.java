package com.bikelifeservices.bikelife.controllers;

import com.bikelifeservices.bikelife.entities.Bike;
import com.bikelifeservices.bikelife.services.BikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/v1/bikes")
public class BikeController {

    private final BikeService bikeService;

    @Autowired
    public BikeController(BikeService bikeService) {
        this.bikeService = bikeService;
    }

    @GetMapping
    public List<Bike> getBikes() {
        return bikeService.getBikes();
    }

    @PostMapping
    public Bike createBike(@RequestBody Bike toAdd) {
        return bikeService.postBike(toAdd);
    }

    @DeleteMapping(path="{bikeId}")
    public void deleteBike(@PathVariable("bikeId") Long id) {
        bikeService.deleteBike(id);
    }
}
