export class Company {

    constructor(id= '', name = '', country = '', city = '', address = ''){
        this.id_company = id;
        this.name = name;
        this.country = country;
        this.city = city;
        this.address = address;
    }

    id_company: string;
    name: string;
    country: string;
    city: string;
    address: string;
}