export class Tax {

    constructor(id='', percentage='',description=''){
        this.id_tax = id;
        this.percentage = percentage;
        this.description = description;
    }

    id_tax: string;
    percentage: string;
    description: string;
}