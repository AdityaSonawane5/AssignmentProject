const Book = require('../models/Book');
const { BOOK_STATUSES } = require('../models/Book');

// GET /api/books?status=reading&tag=sci-fi
async function getBooks(req, res, next) {
  try {
    const { status, tag } = req.query;
    const query = { owner: req.userId };

    if (status) {
      if (!BOOK_STATUSES.includes(status)) {
        return res.status(400).json({ error: 'Invalid status filter.' });
      }
      query.status = status;
    }
    if (tag) {
      query.tags = tag.toLowerCase().trim();
    }

    const books = await Book.find(query).sort({ createdAt: -1 }).lean();
    res.json({ books });
  } catch (err) {
    next(err);
  }
}

// POST /api/books
async function createBook(req, res, next) {
  try {
    const { title, author, tags, status } = req.body;

    if (!title?.trim() || !author?.trim()) {
      return res.status(400).json({ error: 'Title and author are required.' });
    }
    if (status && !BOOK_STATUSES.includes(status)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }

    const book = await Book.create({
      owner: req.userId,
      title: title.trim(),
      author: author.trim(),
      tags: Array.isArray(tags) ? tags : [],
      status: status || 'want-to-read',
    });

    res.status(201).json({ book });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/books/:id
async function updateBook(req, res, next) {
  try {
    const { id } = req.params;
    const updates = {};
    const { title, author, tags, status } = req.body;

    if (typeof title === 'string') {
      if (!title.trim()) return res.status(400).json({ error: 'Title cannot be empty.' });
      updates.title = title.trim();
    }
    if (typeof author === 'string') {
      if (!author.trim()) return res.status(400).json({ error: 'Author cannot be empty.' });
      updates.author = author.trim();
    }
    if (Array.isArray(tags)) {
      updates.tags = tags;
    }
    if (typeof status === 'string') {
      if (!BOOK_STATUSES.includes(status)) {
        return res.status(400).json({ error: 'Invalid status.' });
      }
      updates.status = status;
    }

    const book = await Book.findOneAndUpdate(
      { _id: id, owner: req.userId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }

    res.json({ book });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/books/:id
async function deleteBook(req, res, next) {
  try {
    const { id } = req.params;
    const book = await Book.findOneAndDelete({ _id: id, owner: req.userId });
    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { getBooks, createBook, updateBook, deleteBook };
