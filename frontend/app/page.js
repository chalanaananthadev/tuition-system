"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);

  // Form states for creating a batch
  const [batchName, setBatchName] = useState("");
  const [batchFee, setBatchFee] = useState("");

  // Form states for registering a student
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [selectedBatchId, setSelectedBatchId] = useState("");

  // 1. Fetch data from Spring Boot backend
  const fetchData = async () => {
    try {
      const batchRes = await fetch("http://localhost:8081/api/batches");
      const batchData = await batchRes.json();
      setBatches(batchData);

      const studentRes = await fetch("http://localhost:8081/api/students");
      const studentData = await studentRes.json();
      setStudents(studentData);
    } catch (error) {
      console.error("Error loading data from backend:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Handle creating a new Batch (POST)
  const handleCreateBatch = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8081/api/batches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        name: batchName, 
        fee: parseFloat(batchFee) 
      }),
    });
    setBatchName("");
    setBatchFee("");
    fetchData(); // Refresh table
  };

  // 3. Handle registering a new Student (POST)
  const handleCreateStudent = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8081/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: studentName,
        phone: studentPhone,
        batchId: parseInt(selectedBatchId),
      }),
    });
    setStudentName("");
    setStudentPhone("");
    setSelectedBatchId("");
    fetchData(); // Refresh table
  };

  return (
    <div className="max-w-4xl mx-auto p-8 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Tuition Management System
      </h1>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        
        {/* Form 1: Add Batch */}
        <div className="border border-gray-200 p-6 rounded-xl shadow-sm bg-white text-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Batch</h2>
          <form onSubmit={handleCreateBatch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Batch Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-blue-500"
                placeholder="e.g. Combined Maths 2026"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Monthly Fee (Rs.)</label>
              <input
                type="number"
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-blue-500"
                placeholder="e.g. 3500"
                value={batchFee}
                onChange={(e) => setBatchFee(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
            >
              Create Batch
            </button>
          </form>
        </div>

        {/* Form 2: Register Student */}
        <div className="border border-gray-200 p-6 rounded-xl shadow-sm bg-white text-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Register Student</h2>
          <form onSubmit={handleCreateStudent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-green-500"
                placeholder="e.g. Kasun Perera"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-green-500"
                placeholder="07xxxxxxxx"
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Select Batch</label>
              <select
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-green-500 bg-white"
                value={selectedBatchId}
                onChange={(e) => setSelectedBatchId(e.target.value)}
                required
              >
                <option value="">-- Choose a Batch --</option>
                {batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} (Rs. {b.fee})
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition"
            >
              Register Student
            </button>
          </form>
        </div>

      </div>

      {/* Table Display */}
      <div className="border border-gray-200 p-6 rounded-xl shadow-sm bg-white text-gray-800">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Registered Students</h2>
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="border border-gray-200 p-3">ID</th>
              <th className="border border-gray-200 p-3">Student Name</th>
              <th className="border border-gray-200 p-3">Phone</th>
              <th className="border border-gray-200 p-3">Batch</th>
              <th className="border border-gray-200 p-3">Fee</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400">
                  No students registered yet.
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 border-t border-gray-100">
                  <td className="border border-gray-200 p-3">{s.id}</td>
                  <td className="border border-gray-200 p-3 font-medium">{s.name}</td>
                  <td className="border border-gray-200 p-3">{s.phone}</td>
                  <td className="border border-gray-200 p-3">{s.batch?.name || "No Batch"}</td>
                  <td className="border border-gray-200 p-3">Rs. {s.batch?.fee}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}