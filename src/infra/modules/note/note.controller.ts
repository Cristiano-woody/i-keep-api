import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards } from "@nestjs/common";
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDtoBody, UpdateNoteDtoParams } from './dto/update-note.dto';
import { UserNotFoundError } from "../../../domain/errors/user-not-found-error";
import { CreateNoteUseCase } from "../../../implementation/use-cases/note/create-note";
import { FindAllNotesUseCase } from "../../../implementation/use-cases/note/find-all-notes";
import { FindAllNotesByUserIdUseCase } from "../../../implementation/use-cases/note/find-all-notes-by-user-id";
import { RemoveNoteUseCase } from "../../../implementation/use-cases/note/remove-note";
import { UpdateNoteUseCase } from "../../../implementation/use-cases/note/update-note";
import { NoteNotFoundError } from "../../../domain/errors/note-not-found-error";
import { RemoveNoteDto } from "./dto/remove-note.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller('note')
export class NoteController {
  constructor(
    private createNote: CreateNoteUseCase,
    private findAllNotes: FindAllNotesUseCase,
    private findAllNotesByUserId: FindAllNotesByUserIdUseCase,
    private removeNote: RemoveNoteUseCase,
    private updateNote: UpdateNoteUseCase
  ) {}

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param() params: UpdateNoteDtoParams, @Body() updateNoteDto: UpdateNoteDtoBody) {
    try {
      return await this.updateNote.execute(updateNoteDto, params.id)
    } catch (err) {
      if (err instanceof NoteNotFoundError) {
        return new BadRequestException(err.message)
      }
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param() params: RemoveNoteDto) {
    try {
      return await this.removeNote.execute(params.id)
    } catch (err) {
      if (err instanceof NoteNotFoundError) {
        return new BadRequestException(err.message)
      }
    }
  }
}
