import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from "@nestjs/common";
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UserNotFoundError } from "../../../domain/errors/user-not-found-error";
import { CreateNoteUseCase } from "../../../implementation/use-cases/note/create-note";
import { FindAllNotesUseCase } from "../../../implementation/use-cases/note/find-all-notes";
import { FindAllNotesByUserIdUseCase } from "../../../implementation/use-cases/note/find-all-notes-by-user-id";
import { RemoveNoteUseCase } from "../../../implementation/use-cases/note/remove-note";
import { UpdateNoteUseCase } from "../../../implementation/use-cases/note/update-note";
import { NoteNotFoundError } from "../../../domain/errors/note-not-found-error";

@Controller('note')
export class NoteController {
  constructor(
    private createNote: CreateNoteUseCase,
    private findAllNotes: FindAllNotesUseCase,
    private findAllNotesByUserId: FindAllNotesByUserIdUseCase,
    private removeNote: RemoveNoteUseCase,
    private updateNote: UpdateNoteUseCase
  ) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    try {
      return await this.createNote.execute(createNoteDto)
    } catch (err) {
      if(err instanceof UserNotFoundError) {
        return new BadRequestException(err.message)
      }
    }
  }

  @Get()
  async findAll() {
    return await this.findAllNotes.execute()
  }

  @Get(':id')
  async findAllByUserId(@Param('id') id: string) {
    try {
      return await this.findAllNotesByUserId.execute(id)
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        return new BadRequestException(err.message)
      }
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    try {
      return await this.updateNote.execute(updateNoteDto, id)
    } catch (err) {
      if (err instanceof NoteNotFoundError) {
        return new BadRequestException(err.message)
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.removeNote.execute(id)
    } catch (err) {
      if (err instanceof NoteNotFoundError) {
        return new BadRequestException(err.message)
      }
    }
  }
}
