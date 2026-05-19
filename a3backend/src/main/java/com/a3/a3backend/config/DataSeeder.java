package com.a3.a3backend.config;

import com.a3.a3backend.model.Product;
import com.a3.a3backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedProducts(ProductRepository repo) {
        return args -> {
            // Clear old data and reseed with real A³ products
            repo.deleteAll();

            repo.saveAll(List.of(
                // ── HAIR OILS ──────────────────────────────────────────────
                new Product(
                    "CocoPure Hair Oil",
                    "A premium coconut-infused hair oil that deeply nourishes and moisturizes your hair, leaving it silky smooth and naturally shiny.",
                    125.0, 199.0, 4.9, "Best Seller", "Hair Oils",
                    "/cocopure-hairoil.png", false
                ),
                new Product(
                    "GrowthVeda Hair Oil",
                    "An Ayurvedic growth-boosting formula enriched with potent herbs that stimulate hair follicles and promote thick, healthy hair growth.",
                    125.0, 199.0, 4.8, "New", "Hair Oils",
                    "/growthveda-hairoil.png", false
                ),
                new Product(
                    "KeshShanthi Hair Oil",
                    "A calming herbal hair oil that soothes the scalp, reduces dandruff, and restores hair health with traditional botanical ingredients.",
                    125.0, 199.0, 4.9, "Trending", "Hair Oils",
                    "/keshshanthi-hairoil.png", false
                ),
                new Product(
                    "FallShield Hair Oil",
                    "A powerful anti-hair fall formula that strengthens hair roots, reduces breakage, and shields your hair from damage and thinning.",
                    125.0, 199.0, 4.7, "Popular", "Hair Oils",
                    "/fallsheild-hairoil.png", false
                ),
                new Product(
                    "AloCoco Hair Oil",
                    "A refreshing blend of aloe vera and coconut that hydrates the scalp, repairs dry hair, and promotes natural shine and softness.",
                    125.0, 199.0, 4.8, "Natural", "Hair Oils",
                    "/alococo-hairoil.png", false
                )
            ));

            System.out.println("✅ A³ Products seeded successfully!");
        };
    }
}
