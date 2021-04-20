import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import GenreServices from './genre.service';
import CreateGenreDto from './dto/create-genre.dto';
import { ApiResponse, ApiQuery } from '@nestjs/swagger';
import UpdateGenreDto from './dto/update-genre.dto';

@Controller('genre')
export default class GenreController {
    constructor(private readonly genreServices: GenreServices) { }
    
    @Post('post')
    postGenre(@Body() genre: CreateGenreDto) {
        return this.genreServices.insert(genre);
    }

    @Get()
    getAll() {
        return this.genreServices.getAllGenre();
    }

    @ApiResponse({ status: 200, description: "Delete Genre" })

    @ApiQuery({
        name: 'genreID',
        required: true,
        type: Number,
        description :`id of genre being deleted`
    })

    @Delete('delete')
    deleteBook(@Query('genreID') genreID) {
        return this.genreServices.delete(genreID);
    }

    @ApiResponse({ status: 200, description: "Update Genre" })

    @Put('update')
    updateBook(@Body() genre: UpdateGenreDto) {
        return this.genreServices.update(genre);
    }
}
