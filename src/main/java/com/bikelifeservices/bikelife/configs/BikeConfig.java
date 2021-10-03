package com.bikelifeservices.bikelife.configs;

import com.bikelifeservices.bikelife.entities.Bike;
import com.bikelifeservices.bikelife.repositories.BikeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class BikeConfig {

    @Bean
    CommandLineRunner commandLineRunner(BikeRepository repository) {
        return args -> {
            Bike cannondale = new Bike(
                    "Cannondale",
                    "VTT TOUT SUSPENDU ELECTRIQUE CANNONDALE MOTERRA 3 29'' SRAM SX EAGLE 12V BBQ",
                    "https://media.alltricks.com/medium/15040135e664c68e5b9f1.87060551.jpg?frz-v=298");

            Bike bh = new Bike(
                    "BH",
                    "VTT TOUT SUSPENDU ÉLECTRIQUE BH ATOMX CARBON LYNX 5.5 PRO-S SHIMANO SLX / XT 12V 720 WH 29'' NOIR 2021",
                    "https://media.alltricks.com/medium/207966460b0dea6267e91.07700740.jpg?frz-v=298");

            Bike trek = new Bike(
                    "Trek",
                    "GRAVEL BIKE TREK CHECKPOINT ALR 5 SHIMANO GRX 11V 2021 TEAL",
                    "https://media.alltricks.com/medium/15733025ea82a4d88c7f6.42261302.jpg?frz-v=298");

            Bike bmc = new Bike(
                    "BMC",
                    "VÉLO DE ROUTE BMC ROADMACHINE SEVEN SHIMANO 105 11V 700 MM BLEU PETROL 2022",
                    "https://media.alltricks.com/medium/209144760d45110a22941.59883979.jpg?frz-v=298");

            Bike n = new Bike(
              "N",
              "Truc truc easy",
              "https://media.alltricks.com/medium/209144760d45110a22941.59883979.jpg?frz-v=298"
            );

            repository.saveAll(List.of(cannondale, bh, trek, bmc));
        };
    }
}