import {OrderItem} from "./OrderItem";

export class Order {
    id: number;
    items: OrderItem[];
    date: Date;
    done: boolean;

    constructor(id: number, items: OrderItem[], done:boolean) {
        this.id = id;
        this.items = items;
        this.date = new Date();
        this.done = done;
    }

    public totalPrice(): number {
        var totalPrice = 0;
        this.items.forEach(x => {
           totalPrice = totalPrice + (x.price * x.amount);
        });
        return totalPrice;
    }

    public totalAmountOfOrder(): number {
        return this.items.reduce((partialSum, item) => partialSum + item.amountInCart, 0);
    }

}