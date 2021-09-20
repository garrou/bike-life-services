package com.bikelifeservices.bikelife.entities;

import javax.persistence.*;

@Entity
@Table
public class Bike {

    @Id
    @SequenceGenerator(name="bike_sequence", sequenceName = "bike_sequence", allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "bike_sequence"
    )
    private long id;

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

    public Bike(long id, String name, String description, String image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getImage() {
        return image;
    }
}
