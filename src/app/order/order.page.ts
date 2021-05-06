import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  orderId = null;
  done = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('orderid');
  }

  changeOrderStatus(done: boolean) {
    this.done = done;
    this.router.navigate(['/home']);
  }

}
