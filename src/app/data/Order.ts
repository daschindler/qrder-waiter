import {MenuItem} from "./MenuItem";

export class Order {
    id: number;
    items: MenuItem[];
    date: Date;

    constructor(id: number, items: MenuItem[]) {
        this.id = id;
        this.items = items;
        this.date = new Date();
    }

}