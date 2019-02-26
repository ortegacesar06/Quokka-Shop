export class Image{
    constructor(id = '', path = '', id_product =''){
        this.id_image = id;
        this.path = path;
        this.id_product = id_product;
    }
    id_image: string;
    path: string;
    id_product: string;
}