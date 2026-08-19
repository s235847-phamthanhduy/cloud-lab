const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import Model Student (Cau 35) - Dung file students.js trong thu muc models
const Student = require('./models/students');

const app = express();
app.use(cors());
app.use(express.json());

// Ket noi MongoDB Atlas (Cau 33)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Da ket noi MongoDB Atlas thanh cong!'))
  .catch((err) => console.error('Loi ket noi MongoDB:', err));

// API Hello test Backend (Cau 22)
app.get('/api/hello', (req, res) => {
  res.json({ message: "Backend dang hoat dong!" });
});

// ==========================================
// REST API QUẢN LÝ SINH VIÊN (CÂU 36 - 39)
// ==========================================

// Cau 36: GET /api/students - Lay danh sach sinh vien
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cau 37: POST /api/students - Them sinh vien moi
app.post('/api/students', async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cau 38: PUT /api/students/:id - Cap nhat sinh vien
app.put('/api/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cau 39: DELETE /api/students/:id - Xoa sinh vien
app.delete('/api/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Xoa sinh vien thanh cong!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Khoi dong Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});