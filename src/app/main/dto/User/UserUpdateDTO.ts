export class UserUpdateDTO {
    idString: string;
    firstName: string;
    lastName: string;
    midName: string;
    gender: number;
    dateOfBirth: string;
    email: string;
    address: string;
    displayName: string;
    phone: string;
  
    constructor(user) {
      this.idString = user.idString;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.midName = user.midName;
      this.lastName = user.lastName;
      this.gender = user.gender;
      this.dateOfBirth = user.dateOfBirth;
      this.email = user.email;
      this.address = user.address;
      this.displayName = user.displayName;
      this.phone = user.phone;
    }
  }
  