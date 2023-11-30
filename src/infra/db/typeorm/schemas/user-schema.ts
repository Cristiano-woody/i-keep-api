import { EntitySchema } from "typeorm";
import { User } from "../../../../domain/entities/User";
import { Note } from "../../../../domain/entities/Note";

export const UserSchema = new EntitySchema<User>({
  name: 'user',
  target: User,
  columns: {
    id: {
      type: 'uuid',
      primary: true
    },
    name: {
      type: String,
      length: 255
    },
    email: {
      type: String,
      length: 255
    },
    password: {
      type: String,
      length: 255
    },
    isActive: {
      type: Boolean
    },
  },
  relations: {
    notes: {
      type: 'one-to-many',
      target: 'Note', // Nome da entidade alvo (Note)
      inverseSide: 'user_id', // Nome do campo no lado inverso da relação na entidade 'Note'
    }
  }
})