package com.tuition.backend.student;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // GET /api/students
    @GetMapping
    public List<Student> getStudents() {
        return studentService.getAllStudents();
    }

    // POST /api/students
    @PostMapping
    public Student addStudent(@RequestBody StudentRequest request) {
        return studentService.registerStudent(request);
    }
}
