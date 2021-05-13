import { Component } from '@angular/core';
import { OrderItem } from './data/OrderItem';
import { Order } from './data/Order';
import { MenuCategory } from './data/MenuCategory';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  categories: MenuCategory[] = []
  items: OrderItem[] = []

  orders: Order[] = [];


  constructor(public http: HttpClient) {
    this.loadItemsFromJson();
  }

  loadItemsFromJson() {
    this.readJsonData().subscribe(categories => {
      this.categories = categories;
      this.items = this.categories.reduce((x, y) => x.concat(y.items), []);
      this.orders = [
          new Order(1, this.items, false),
          new Order(2, this.items, false),
          new Order(3, this.items, false),
          new Order(4, this.items, false),
          new Order(5, this.items, false),
          new Order(6, this.items, true),
          new Order(7, this.items, false),
          new Order(8, this.items, true),
          new Order(9, this.items, true),
          new Order(10, this.items, true)
      ];
    });
  }

  public readJsonData(): Observable<MenuCategory[]> {
    return this.http.get<MenuCategory[]>('assets/data/items.json');
  }

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

