package com.a3.a3backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Double price;
    private Double originalPrice;
    private Double rating;
    private String badge;
    private String category;
    private String imageUrl;
    private Boolean isCombo = false;

    public Product() {}

    public Product(String name, String description, Double price, Double originalPrice,
                   Double rating, String badge, String category, String imageUrl, Boolean isCombo) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.originalPrice = originalPrice;
        this.rating = rating;
        this.badge = badge;
        this.category = category;
        this.imageUrl = imageUrl;
        this.isCombo = isCombo;
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public Double getPrice() { return price; }
    public Double getOriginalPrice() { return originalPrice; }
    public Double getRating() { return rating; }
    public String getBadge() { return badge; }
    public String getCategory() { return category; }
    public String getImageUrl() { return imageUrl; }
    public Boolean getIsCombo() { return isCombo; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setPrice(Double price) { this.price = price; }
    public void setOriginalPrice(Double originalPrice) { this.originalPrice = originalPrice; }
    public void setRating(Double rating) { this.rating = rating; }
    public void setBadge(String badge) { this.badge = badge; }
    public void setCategory(String category) { this.category = category; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setIsCombo(Boolean isCombo) { this.isCombo = isCombo; }
}
