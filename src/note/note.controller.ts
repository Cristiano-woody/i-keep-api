import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from "@nestjs/common";
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Get()
  findAll() {
    return this.noteService.findAll();
  }

  @Get(':userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.noteService.findAllByUserId(userId);
  }

  @Patch(':noteId')
  update(@Param('noteId') noteId: string, @Body() updateNoteDto: UpdateNoteDto) {
    if((updateNoteDto.title === undefined || updateNoteDto.title === null) && (updateNoteDto.description === undefined || updateNoteDto.description === null)) {
      return new BadRequestException('Title or description is required.')
    }
    return this.noteService.update(noteId, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(id);
  }
}
