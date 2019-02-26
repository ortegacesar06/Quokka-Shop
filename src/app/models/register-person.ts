export class RegisterPerson {

    constructor(id_person='', dni_type='', dni='', first_name='', last_name='', birthdate='', postal_code='', id_role=''){
        this.id_person = id_person;
        this.dni_type = dni_type;
        this.dni = dni;
        this.first_name = first_name;
        this.last_name = last_name;
        this.birthdate = birthdate;
        this.postal_code = postal_code;
        this.id_role = id_role;
    }

    id_person: string;
    dni_type: string;
    dni: string;
    first_name: string;
    last_name: string;
    birthdate: string;
    postal_code: string;
    id_role: string;
}