import { Injectable } from '@nestjs/common';
import { BookDTO } from './book.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class BooksService {

 constructor( private prisma: PrismaService){}
    async createBook(data: BookDTO) {
         
        const bookExists = await this.prisma.book.findFirst({
            where: {
                bar_code: data.bar_code 
            }
        })

        if (bookExists) {
            throw new Error('Book already exists')
        }


       const book = await this.prisma.book.create({
            data: {
                title: data.title,
                description: data.description,
                bar_code: data.bar_code
            
            }

    })
    return book;
}

async findAll() {
    return this.prisma.book.findMany();
} 

async update(id: string , data: BookDTO) {
    const bookExists = await this.prisma.book.findUnique({
        where: {
            bar_code: data.bar_code
        }

       
    })
    if (!bookExists) {
        throw new Error('Book not found')
    }
     return await this.prisma.book.update({
        where: {
            id: Number(id)
        },
        data: {
            title: data.title,
            description: data.description,
            bar_code: data.bar_code
        }
    })
}
async delete(id: string) {

    return this.prisma.book.delete({
        where: {
            id: Number(id)
        }
        
    })
  
}}