export class Promotion {

    constructor(id='', name='', description='', percentage='', start_date='', end_date=''){
        this.id_promotion = id;
        this.name = name;
        this.description = description;
        this.percentage = percentage;
        this.start_date = start_date;
        this.end_date = end_date;
    }

    id_promotion: string;
    name: string;
    description: string;
    percentage: string;
    start_date: string;
    end_date: string;
}