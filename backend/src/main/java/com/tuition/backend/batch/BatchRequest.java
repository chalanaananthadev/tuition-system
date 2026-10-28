package com.tuition.backend.batch;

import java.math.BigDecimal;

public class BatchRequest {
    private String name;
    private BigDecimal fee;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public BigDecimal getFee() { return fee; }
    public void setFee(BigDecimal fee) { this.fee = fee; }
}