import { RegisterPerson } from 'src/app/models/register-person';
import { Product } from './product';

export class Order {

    constructor(id_order= '', num_order = '', tax = '', total = '', person = new RegisterPerson, product = []){
        this.id_order = id_order;
        this.num_order = num_order;
        this.tax = tax;
        this.total = total;
        this.Person = person;
        this.Product = product;
    }
    id_order: string;
    num_order: string;
    tax: string;
    total: string;
    state: boolean;
    Person: RegisterPerson;
    Product: Product[];
}