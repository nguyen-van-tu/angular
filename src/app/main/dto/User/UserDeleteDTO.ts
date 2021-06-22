export class UserDeleteDTO {
  idString: string;
  isDeleted: number;

  constructor(user) {
    this.idString = user.idString;
    this.isDeleted = user.isDeleted;
  }
}
