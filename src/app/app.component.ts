import { Component } from '@angular/core';
import { MenuItem } from './data/MenuItem';
import { Order } from './data/Order';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  items: MenuItem[] = [
    {name: 'Freistaedter', price: 3.8, amount: 0.33},
    {name: 'Stiegl', price: 0.1, amount: 0.5}
  ];

  orders: Order[] = [
    new Order(1, this.items, false),
    new Order(2, this.items, false),
    new Order(3, this.items, false),
    new Order(4, this.items, false),
    new Order(5, this.items, false),
    new Order(6, this.items, true),
    new Order(7, this.items, false),
    new Order(8, this.items, true),
    new Order(9, this.items, true),
    new Order(10, this.items, true),
  ];


  constructor() {}

  sortOrdersByDateAndFinished() {
    //sort by time
    this.orders.sort(function(x, y) {
      return x.date.getTime() - y.date.getTime();
    });


    //sort by finished
    this.orders.sort(function(x, y) {
      return Number(x.done) - Number(y.done);
    });
  }
}
