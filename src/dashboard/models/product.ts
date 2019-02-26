import { Image } from './image';

export class Product {

    constructor(id='', name='', description='', code='', price='', brand='', company='', id_category='', tax='', images = [], external = '',){
        this.id_product = id;
        this.name = name;
        this.description = description;
        this.code = code;
        this.price = price;
        this.brand = brand;
        this.id_company = company;
        this.id_category = id_category;
        this.id_tax = tax;
        this.Images = images;
        this.external_id = external;
        
    }

    id_product: string;
    name: string;
    description: string;
    code: string;
    price: string;
    brand: string;
    stock: number;
    sold: number;
    id_company: string;
    id_category: string;
    id_tax: string;
    Images: Image[];
    external_id: string;
}