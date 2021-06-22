import { UserListDTO } from "src/app/main/dto/User/UserListDTO";

export class SelectionUser {
  page: number;
  listUserDTO: UserListDTO[];

  constructor(page: number, list: UserListDTO[]) {
    this.page = page;
    this.listUserDTO = list;
  }
}
