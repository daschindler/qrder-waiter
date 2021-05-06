import {MenuItem} from "./MenuItem";

export class Order {
    id: number;
    items: MenuItem[];
    date: Date;
    done: boolean;

    constructor(id: number, items: MenuItem[], done:boolean) {
        this.id = id;
        this.items = items;
        this.date = new Date();
        this.done = done;
    }

}