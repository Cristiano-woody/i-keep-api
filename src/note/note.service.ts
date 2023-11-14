import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class NoteService {
  constructor(@InjectRepository(Note) private noteRepository: Repository<Note>, private userService: UserService) {}

  async create(createNoteDto: CreateNoteDto) {
    const user = await this.userService.findOnebyID(createNoteDto.userId)
    const newNote = new Note()
    newNote.title = createNoteDto.title
    newNote.description = createNoteDto.description
    newNote.user = user
    return this.noteRepository.save(newNote)
  }

  findAll() {
    return this.noteRepository.find({relations:['user']});
  }

  findAllByUserId(userId: string) {
    return this.noteRepository.find({
      where: {
        user: {
          id: userId
        }
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const oldNote = await this.noteRepository.findOne({
      where: {id: id}
    }).catch(err => {
      throw new BadRequestException('Invalid UUID.')
    })
    await this.noteRepository.update(oldNote.id, updateNoteDto)
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
