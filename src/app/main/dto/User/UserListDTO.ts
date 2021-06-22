export class UserListDTO {
  idString: string;
  userName: string;
  displayName: string;
  firstName: string;
  midName: string;
  lastName: string;
  gender: number;
  dateOfBirth: string;
  email: string;
  address: string;
  phone: string;
  status: number;
  isDeleted: number;

  constructor(user) {
    this.idString = user.idString;
    this.userName = user.userName;
    this.displayName = user.displayName;
    this.firstName = user.firstName;
    this.midName = user.midName === null ? "" : user.midName;
    this.lastName = user.lastName;
    this.gender = user.gender;
    this.dateOfBirth = user.dateOfBirth;
    this.email = user.email;
    this.address = user.address;
    this.phone = user.phone;
    this.status = user.status;
    this.isDeleted = user.isDeleted;
  }
}
