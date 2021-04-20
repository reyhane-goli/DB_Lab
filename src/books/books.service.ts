import BookEntity from '../db/book.entity';
import CreateBookDto from './dto/create-book.dto';
import UserEntity from '../db/user.entity';
import { createQueryBuilder, getConnection } from 'typeorm';
import GenreEntity from '../db/genre.entity';
import UpdateBookDto from './dto/update-book.dto';

export class BooksService {

    async insert(bookDetails: CreateBookDto): Promise<BookEntity> {
        const { name, userID, genreIDs } = bookDetails;
        const book = new BookEntity();
        book.name = name;
        book.user = await UserEntity.findOne(userID);
        book.genres = [];
        for (let i = 0; i < genreIDs.length; i++) {
            const genre = await GenreEntity.findOne(genreIDs[i]);
            book.genres.push(genre);
        }
        await book.save();
        return book;
    }

    async getAllBooks(): Promise<BookEntity[]> {
        return BookEntity.find();
    }

    async delete(bookID: number): Promise<BookEntity> {
        const book = await BookEntity.findOne(bookID);
        await book.remove();
        return book;
    }

    async update(bookDetails: UpdateBookDto): Promise<BookEntity> {
        const { id, name, userID, genreIDs } = bookDetails;
        const book = await BookEntity.findOne(id);
        if (book != undefined) {
            book.name = name;
            book.user = await UserEntity.findOne(userID);
            book.genres = [];
            genreIDs.forEach(async genreID => {
                const genre = await GenreEntity.findOne(genreID);
                book.genres.push(genre);
            });
            await book.save();
        }
        return book;
    }

}