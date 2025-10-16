const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all todos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a single todo by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new todo
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const [result] = await pool.query('INSERT INTO todos (title, description) VALUES (?, ?)', [title, description]);
    res.status(201).json({ id: result.insertId, title, description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const [result] = await pool.query(
      'UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ?',
      [title, description, completed, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
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

module.exports = router;
