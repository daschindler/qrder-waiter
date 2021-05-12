import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  orderId = null;
  order = null;
  orderStatus = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public appComponent: AppComponent) { }

  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('orderid');
    this.order = this.appComponent.orders.find(x => x.id === Number(this.orderId));
    this.orderStatus = this.order.done ? 'Finished' : 'New';
  }

  changeOrderStatus() {
    console.log(this.order);
    if (this.order != null) {
      this.order.done = !this.order.done;
      this.appComponent.orders.find(x => x.id == this.orderId).done = this.order.done;
      this.appComponent.sortOrdersByDateAndFinished();
    }
    this.router.navigate(['/home']);
  }

}
