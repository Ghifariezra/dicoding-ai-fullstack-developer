import express from 'express';
import {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler,
} from './handler.js';

const router = express.Router();

router.post('/books', addBookHandler);
router.get('/books', getAllBooksHandler);
router.get('/books/:bookId', getBookByIdHandler);
router.put('/books/:bookId', editBookByIdHandler);
router.delete('/books/:bookId', deleteBookByIdHandler);

export default router;