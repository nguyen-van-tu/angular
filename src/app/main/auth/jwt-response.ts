import { AccountInfoDTO } from '../dto/User/UserDTO';

export class JwtResponse {
    token: string;
    username: string;
    accountBasicInfoDTO: AccountInfoDTO;
}