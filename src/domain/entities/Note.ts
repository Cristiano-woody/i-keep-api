export class Note {
  id: string
  title: string
  description: string
  user_id: string
  constructor(data?:Note) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.user_id = data.user_id
  }
}