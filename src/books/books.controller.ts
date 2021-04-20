import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger/dist';
import BookEntity from 'src/db/book.entity';
import CreateBookDto from './dto/create-book.dto';
import { BooksService } from './books.service';
import UpdateBookDto from './dto/update-book.dto';

@Controller('book')
export default class BooksController {
    constructor(private readonly bookService: BooksService) { }

    @ApiResponse({
        status: 201,
        description: 'Add Book'
    })

    @Post('post')
    postGenre(@Body() book: CreateBookDto) {
        return this.bookService.insert(book);
    }

    @ApiResponse({
        status: 200,
        description: 'Get Books'
    })

    @Get()
    getAll() {
        return this.bookService.getAllBooks();
    }


    @ApiResponse({ status: 200, description: "Delete Book" })

    @ApiQuery({
        name: 'bookID',
        required: true,
        type: Number,
        description: `id of book being deleted`
    })

    @Delete('delete')
    deleteBook(@Query('bookID') bookID) {
        return this.bookService.delete(bookID);
    }


    @ApiResponse({ status: 200, description: "Update Book" })
    @Put('update')
    updateBook(@Body() book: UpdateBookDto) {
        return this.bookService.update(book);
    }
}