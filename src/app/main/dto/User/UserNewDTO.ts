export class UserNewDTO{
    fullName: string;
    currentAddress: string;
    username:string;
    password:string;
  
    constructor(user) {
      this.username = user.username;
      this.password = user.password;
      this.fullName = user.fullName;
      this.currentAddress = user.currentAddress;
    }
}