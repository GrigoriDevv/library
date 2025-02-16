import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from './book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}


  @Post()
  async create(@Body() data: BookDTO) {
    return this.booksService.createBook(data);
  }


  @Get()
async findAll() {
    return this.booksService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: BookDTO) {
    return this.booksService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.booksService.delete(id);
  }
  
}
