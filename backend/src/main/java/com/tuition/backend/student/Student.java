package com.tuition.backend.student;

import com.tuition.backend.batch.Batch;
import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phone;

    // Many students can belong to one batch
    @ManyToOne
    @JoinColumn(name = "batch_id")
    private Batch batch;

    public Student() {}

    public Student(String name, String phone, Batch batch) {
        this.name = name;
        this.phone = phone;
        this.batch = batch;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Batch getBatch() { return batch; }
    public void setBatch(Batch batch) { this.batch = batch; }
}
