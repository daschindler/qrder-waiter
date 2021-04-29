export class MenuItem {
    name: string;
    price: number;
    amount: number;

    constructor(name: string, price: number, amount: number) {
        this.name = name;
        this.price = price;
        this.amount = amount;
    }
}