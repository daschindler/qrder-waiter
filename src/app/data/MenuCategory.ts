import { OrderItem } from './OrderItem';

export class MenuCategory {
    name: string;
    imagePath: string;
    items: OrderItem[];
    visible: boolean;

    constructor(name: string, imagePath: string, items: OrderItem[], visible: boolean = false) {
        this.name = name;
        this.imagePath = imagePath;
        this.items = items;
        this.visible = visible;
    }

}