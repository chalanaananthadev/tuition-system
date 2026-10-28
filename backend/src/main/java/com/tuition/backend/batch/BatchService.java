package com.tuition.backend.batch;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BatchService {

    private final BatchRepository batchRepository;

    // Connects the repository to the service
    public BatchService(BatchRepository batchRepository) {
        this.batchRepository = batchRepository;
    }

    // Rule: Fetch all batches
    public List<Batch> getAllBatches() {
        return batchRepository.findAll();
    }

    // Rule: Validate and create a new batch
    public Batch createBatch(BatchRequest request) {
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Batch name cannot be empty");
        }
        
        Batch batch = new Batch(request.getName(), request.getFee());
        return batchRepository.save(batch);
    }
}