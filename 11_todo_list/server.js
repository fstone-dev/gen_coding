const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3001;
const pool = require('./db'); // db.js에서 pool을 가져옵니다.

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// GET /api/todos — 모든 할 일 조회
app.get('/api/todos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /api/todos — 새로운 할 일 추가
app.post('/api/todos', async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ message: 'Task content cannot be empty' });
    }
    const [result] = await pool.query('INSERT INTO todos (task) VALUES (?)', [task]);
    const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT /api/todos/:id — 완료 상태 토글
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('UPDATE todos SET is_completed = NOT is_completed WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo status toggled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE /api/todos/:id — 할 일 삭제
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM todos WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
