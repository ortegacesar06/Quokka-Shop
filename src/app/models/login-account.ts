export class LoginAccount {
    constructor(username = '', password = ''){
        this.username = username;
        this.password = password;
    }
    username: string;
    password: string;
}