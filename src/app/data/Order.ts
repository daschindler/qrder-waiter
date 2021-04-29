import {MenuItem} from "./MenuItem";

export class Order {
    id: number;
    items: MenuItem[];

    constructor(id: number, items: MenuItem[]) {
        this.id = id;
        this.items = items;
    }

}