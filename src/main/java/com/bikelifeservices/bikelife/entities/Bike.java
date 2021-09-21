package com.bikelifeservices.bikelife.entities;

import javax.persistence.*;

@Entity
@Table
public class Bike {

    @Id
    @SequenceGenerator(name = "bike_sequence", sequenceName = "bike_sequence", allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "bike_sequence"
    )
    private long bikeId;

    private String name;

    private String description;

    private String image;

    public Bike() {
    }

    public Bike(String name, String description, String image) {
        this.name = name;
        this.description = description;
        this.image = image;
    }

    public Bike(long bikeId, String name, String description, String image) {
        this.bikeId = bikeId;
        this.name = name;
        this.description = description;
        this.image = image;
    }
}
