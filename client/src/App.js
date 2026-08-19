import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Cau 47: Lay danh sach sinh vien tu Backend API
  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      const data = await res.json();
      if (Array.isArray(data)) {
        setStudents(data);
      }
    } catch (error) {
      console.error('Loi khi lay danh sach:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Cau 48 & 49: Them sinh vien moi qua Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, name, email })
      });
      if (res.ok) {
        setStudentId('');
        setName('');
        setEmail('');
        fetchStudents();
      }
    } catch (error) {
      console.error('Loi khi them sinh vien:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Quan Ly Sinh Vien</h2>

      {/* Form nhap lieu (Cau 48) */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="MSSV"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Ho ten"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Them Sinh Vien</button>
      </form>

      {/* Danh sach hiển thị (Cau 47) */}
      <h3>Danh sach sinh vien</h3>
      <ul>
        {students.map((st) => (
          <li key={st._id}>
            {st.studentId} - {st.name} ({st.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;