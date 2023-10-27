import { Module, forwardRef } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note]),
    UserModule
  ],
  controllers: [NoteController],
  providers: [NoteService],
  exports: [TypeOrmModule]
})
export class NoteModule {}
