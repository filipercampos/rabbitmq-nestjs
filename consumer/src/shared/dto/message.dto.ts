export class MessageDto {
  constructor(message: string) {
    this.message = message;
  }
  message: string;
}

export class PostMessageDto {
  constructor(id: string, message: string) {
    this.id = id;
    this.message = message;
  }
  id: string;
  message: string;
}
