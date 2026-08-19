const mongoose = require('mongoose');

// Định nghĩa khung dữ liệu (Schema) cho Sinh viên
const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

// Export Model ra để server.js có thể dùng lại
module.exports = mongoose.model('Student', studentSchema);