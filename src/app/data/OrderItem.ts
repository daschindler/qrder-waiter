export class OrderItem {
    id: number;
    name: string;
    price: number;
    amount: number;
    amountInCart: number;

    constructor(id: number, name: string, price: number, amount: number, amountInCart: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.amount = amount;
        this.amountInCart = amountInCart;
    }
}