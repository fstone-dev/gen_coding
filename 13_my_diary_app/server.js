
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// GET /api/diaries - 모든 일기 목록을 최신순으로 조회
app.get('/api/diaries', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM diaries ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching diaries:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/diaries/:id - 특정 id의 일기 하나를 상세 조회
app.get('/api/diaries/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM diaries WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Diary not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(`Error fetching diary ${id}:`, error);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /api/diaries - 새 일기를 생성
app.post('/api/diaries', async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content cannot be empty' });
  }

  try {
    const [result] = await db.query('INSERT INTO diaries (title, content) VALUES (?, ?)', [title, content]);
    const newDiaryId = result.insertId;
    const [newDiary] = await db.query('SELECT * FROM diaries WHERE id = ?', [newDiaryId]);
    res.status(201).json(newDiary[0]);
  } catch (error) {
    console.error('Error creating diary:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT /api/diaries/:id - 특정 id의 일기를 수정
app.put('/api/diaries/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content cannot be empty' });
  }

  try {
    const [result] = await db.query('UPDATE diaries SET title = ?, content = ? WHERE id = ?', [title, content, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Diary not found' });
    }
    const [updatedDiary] = await db.query('SELECT * FROM diaries WHERE id = ?', [id]);
    res.json(updatedDiary[0]);
  } catch (error) {
    console.error(`Error updating diary ${id}:`, error);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE /api/diaries/:id - 특정 id의 일기를 삭제
app.delete('/api/diaries/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM diaries WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Diary not found' });
    }
    res.status(204).send(); // No Content
  } catch (error) {
    console.error(`Error deleting diary ${id}:`, error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
