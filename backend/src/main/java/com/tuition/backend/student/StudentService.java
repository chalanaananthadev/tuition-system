package com.tuition.backend.student;

import com.tuition.backend.batch.Batch;
import com.tuition.backend.batch.BatchRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final BatchRepository batchRepository;

    public StudentService(StudentRepository studentRepository, BatchRepository batchRepository) {
        this.studentRepository = studentRepository;
        this.batchRepository = batchRepository;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student registerStudent(StudentRequest request) {
        // Look up the batch from the batch repository
        Batch batch = batchRepository.findById(request.getBatchId())
                .orElseThrow(() -> new IllegalArgumentException("Batch not found with ID: " + request.getBatchId()));

        Student student = new Student(request.getName(), request.getPhone(), batch);
        return studentRepository.save(student);
    }
}
