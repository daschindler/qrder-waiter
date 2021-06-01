import {OrderItem} from "./OrderItem";

export class Order {
    id: number;
    items: OrderItem[];
    date: Date;
    done: boolean;

    constructor(id: number, items: OrderItem[], date: Date, done:boolean) {
        this.id = id
        this.items = items
        if (date === null) {
            console.log("date is null")
            this.date = new Date()
            console.log("date is: " + this.date)
        } else {
            this.date = date
        }
        this.done = done
    }

    public totalPrice(): number {
        let totalPrice = 0;
        this.items.forEach(x => {
            totalPrice = totalPrice + (x.price * x.amountInCart);
        });
        return totalPrice;
    }

    public totalAmountOfOrder(): number {
        return this.items.reduce((partialSum, item) => partialSum + item.amountInCart, 0);
    }
}