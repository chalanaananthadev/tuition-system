package com.tuition.backend.batch;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/batches")
@CrossOrigin(origins = "*") // Allows your frontend to make calls to this backend
public class BatchController {

    private final BatchService batchService;

    public BatchController(BatchService batchService) {
        this.batchService = batchService;
    }

    // GET http://localhost:8080/api/batches
    @GetMapping
    public List<Batch> getBatches() {
        return batchService.getAllBatches();
    }

    // POST http://localhost:8080/api/batches
    @PostMapping
    public Batch addBatch(@RequestBody BatchRequest request) {
        return batchService.createBatch(request);
    }
}
