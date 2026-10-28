-- Create Batches table
CREATE TABLE batches (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    fee NUMERIC(10, 2) NOT NULL
);

-- Create Students table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    batch_id INT REFERENCES batches(id) ON DELETE SET NULL
);