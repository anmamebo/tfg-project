import { User } from "./user.model";

export class AuthResponse {
    constructor(
        public token: string,
        public user: User
    ) {}
}