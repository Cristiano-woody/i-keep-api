import { EntitySchema } from "typeorm";
import { Note } from "../../../../domain/entities/Note";

export const NoteSchema = new EntitySchema<Note>({
  name: 'note',
  target: Note,
  columns: {
    id: {
      type: 'uuid',
      primary: true
    },
    title: {
      type: String,
      length: 255
    },
    description: {
      type: String,
      length: 255
    },
    user_id: {
      type: 'uuid',
    }
  },
  relations: {
    user_id: {
      type: 'many-to-one',
      target: 'User', // O nome da entidade alvo
      joinColumn: { name: 'user_id' }, // Nome da coluna na tabela 'note'
      inverseSide: 'notes', // Nome do campo no lado inverso da relação na entidade 'User'
    },
  }
})