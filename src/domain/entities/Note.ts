export class Note {
  id: string
  title: string
  description: string
  user_id: string
  private constructor(data?:Note) {
    // usado por ORM
    if(!data) {
      this.id = ''
      return
    }
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.user_id = data.user_id
  }

  static create(data: Note) {
    return new Note(data)
  }
}