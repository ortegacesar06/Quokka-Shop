export class Cart {
    constructor(external = '', name = '', category = '', cant = 0, pu = 0, pt = 0, id = 0){
        this.external = external;
        this.name = name;
        this.category = category;
        this.cant = cant;
        this.pu = pu;
        this.pt = pt;
        this.id = id;
    }
    
    external: string;
    name: string;
    category: string;
    cant: number;
    pu: number;
    pt: number;
    id: number;
}
