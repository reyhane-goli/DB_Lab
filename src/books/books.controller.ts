import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
//import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger/dist';
import BookEntity from 'src/db/book.entity';
import CreateBookDto from './dto/create-book.dto';
import { BooksService } from './books.service';

@Controller('book')
export default class BooksController {
    constructor(private readonly bookService: BooksService) { }

    @Post('post')
    postGenre(@Body() book: CreateBookDto) {
        return this.bookService.insert(book);
    }

    @Get()
    getAll() {
        return this.bookService.getAllBooks();
    }

}