const mongoose = require('mongoose');

const BOOK_STATUSES = ['want-to-read', 'reading', 'completed'];

const BookSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 200,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
      maxlength: 120,
    },
    tags: {
      type: [String],
      default: [],
      set: (tags) =>
        Array.isArray(tags)
          ? tags.map((t) => t.trim().toLowerCase()).filter((t) => t.length > 0)
          : [],
    },
    status: {
      type: String,
      enum: BOOK_STATUSES,
      default: 'want-to-read',
    },
  },
  { timestamps: true }
);

BookSchema.index({ owner: 1, status: 1 });
BookSchema.index({ owner: 1, tags: 1 });

module.exports = mongoose.model('Book', BookSchema);
module.exports.BOOK_STATUSES = BOOK_STATUSES;
