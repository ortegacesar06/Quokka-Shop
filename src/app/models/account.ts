import { RegisterPerson } from './register-person';

export class Account {

    constructor(id_account='', user_name='', email='', password='', secure_token='', phone_number='', id_person='', person = new RegisterPerson()){
        this.id_account = id_account;
        this.user_name = user_name;
        this.email = email;
        this.password = password;
        this.secure_token = secure_token;
        this.phone_number = phone_number;
        this.id_person = id_person;
        this.Person = person;
    }

    id_account: string;
    user_name: string;
    email: string;
    password: string;
    secure_token: string;
    phone_number: string;
    id_person: string;
    state: boolean;
    Person: RegisterPerson;
}