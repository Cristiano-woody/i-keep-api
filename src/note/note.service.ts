import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NoteService {
  constructor(@InjectRepository(Note) private noteRepository: Repository<Note>) {}

  create(createNoteDto: CreateNoteDto) {
    // const newNote = new Note()
    // newNote.title = createNoteDto.title
    // newNote.description = createNoteDto.description
    // newNote.user = createNoteDto.user
    // return this.noteRepository.save(newNote)
  }

  findAll() {
    return this.noteRepository.find({relations:['user']});
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
