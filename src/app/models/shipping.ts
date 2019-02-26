export class Shipping {
    constructor(id ='', type='', description='', address='', city='', id_order=''){
        this.id_shipping = id;
        this.type = type;
        this.description = description;
        this.address = address;
        this.city = city;
        this.id_order = id_order;
    }

    id_shipping: string;
    type: string;
    description: string;
    address: string;
    city: string;
    id_order: string;
}
