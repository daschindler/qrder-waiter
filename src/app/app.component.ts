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
    this.loadItemsFromJson()
  }

  loadItemsFromJson() {
    this.readJsonData().subscribe(categories => {
      this.categories = categories;
      this.items = this.categories.reduce((x, y) => x.concat(y.items), []);
      this.loadOldOrders()
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

  private loadOldOrders() {
    let storedOrders = localStorage.getItem('orders')
    let stores = JSON.parse(storedOrders)

    stores.forEach(x => {
      let date = new Date(x.date)
      this.orders.push(new Order(x.id, x.items, date, x.done))
    })

    console.log(this.orders)
  }
}

