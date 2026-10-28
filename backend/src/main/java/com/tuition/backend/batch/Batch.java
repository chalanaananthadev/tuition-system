package com.tuition.backend.batch;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "batches")
public class Batch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // Changed from Long to Integer

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private BigDecimal fee;

    public Batch() {}

    public Batch(String name, BigDecimal fee) {
        this.name = name;
        this.fee = fee;
    }

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public BigDecimal getFee() { return fee; }
    public void setFee(BigDecimal fee) { this.fee = fee; }
}