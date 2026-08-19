import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null); // Luu ID sinh vien dang sua

  // Fetch danh sach sinh vien
  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      const data = await res.json();
      if (Array.isArray(data)) setStudents(data);
    } catch (error) {
      console.error('Loi khi lay danh sach:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Them hoac Cap nhat sinh vien (Cau 61 & Form)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Cau 61: PUT /api/students/:id - Cap nhat
        const res = await fetch(`/api/students/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentId, name, email })
        });
        if (res.ok) setEditingId(null);
      } else {
        // POST /api/students - Them moi
        await fetch('/api/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentId, name, email })
        });
      }
      setStudentId('');
      setName('');
      setEmail('');
      fetchStudents();
    } catch (error) {
      console.error('Loi khi xu ly:', error);
    }
  };

  // Cau 62: DELETE /api/students/:id - Xoa sinh vien
  const handleDelete = async (id) => {
    if (window.confirm('Ban co chac muon xoa sinh vien nay?')) {
      try {
        const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
        if (res.ok) fetchStudents();
      } catch (error) {
        console.error('Loi khi xoa:', error);
      }
    }
  };

  // Chuan bi dữ liệu để Sửa
  const handleEdit = (st) => {
    setEditingId(st._id);
    setStudentId(st.studentId);
    setName(st.name);
    setEmail(st.email);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Quan Ly Sinh Vien</h2>

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
        <button type="submit">
          {editingId ? 'Cap Nhat' : 'Them Sinh Vien'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setStudentId('');
              setName('');
              setEmail('');
            }}
            style={{ marginLeft: '10px' }}
          >
            Huy
          </button>
        )}
      </form>

      <h3>Danh sach sinh vien</h3>
      <ul>
        {students.map((st) => (
          <li key={st._id} style={{ marginBottom: '8px' }}>
            {st.studentId} - {st.name} ({st.email}){' '}
            <button
              onClick={() => handleEdit(st)}
              style={{ marginLeft: '10px', marginRight: '5px' }}
            >
              Sua
            </button>
            <button onClick={() => handleDelete(st._id)}>Xoa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;