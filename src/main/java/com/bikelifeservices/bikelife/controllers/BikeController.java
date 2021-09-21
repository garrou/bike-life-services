package com.bikelifeservices.bikelife.controllers;

import com.bikelifeservices.bikelife.entities.Bike;
import com.bikelifeservices.bikelife.services.BikeService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/bikes")
public class BikeController {

    private final BikeService bikeService;

    @Autowired
    public BikeController(BikeService bikeService) {
        this.bikeService = bikeService;
    }

    @GetMapping
    public ResponseEntity<List<Bike>> getBikes() {
        return ResponseEntity.ok().body(bikeService.getBikes());
    }

    @PostMapping
    public ResponseEntity<Bike> postBike(@RequestBody Bike bike) {
        return ResponseEntity.ok().body(bikeService.createBike(bike));
    }

    @DeleteMapping(path="{bikeId}")
    public ResponseEntity.BodyBuilder deleteBike(@PathVariable("bikeId") Long id) {
        bikeService.deleteBike(id);
        return ResponseEntity.ok();
    }
}
