import {Component} from '@angular/core';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import {Router} from "@angular/router";
import {OrderItem} from "../data/OrderItem";
import {Order} from "../data/Order";
import { AppComponent } from '../app.component';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(private qrScanner: QRScanner, private router: Router, public app: AppComponent, public datepipe: DatePipe) {
    }

    onScanClick() {
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    // camera permission was granted
                    const ionApp = <HTMLElement>document.getElementsByTagName("ion-app")[0];
                    ionApp.style.display = "none";
                    this.qrScanner.show();
                    
                    // start scanning
                    let scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        let versionNr = text.charCodeAt(0);
                        let items = []

                        if (versionNr === 1) {
                            let index = 1;
                            while (index < text.length) {
                                let code = text.charCodeAt(index).toString(16);
                                code = code.padStart(4, "0");

                                let amount = code.substr(0, 1);
                                let amountInt = parseInt(amount, 16) + 1;

                                let id = code.substr(1, 3);
                                let idInt = parseInt(id, 16);

                                items.push(this.findBelongingOrderItem(idInt, amountInt));

                                index++;
                            }


                            let order = new Order(this.app.orders.length+1, items, null, false);
                            this.app.orders.push(order);
                            localStorage.setItem('orders', JSON.stringify(this.app.orders))
                        }

                        console.log('Scanned something', text);
                        ionApp.style.display = "block";
                        this.qrScanner.hide();
                        scanSub.unsubscribe(); // stop scanning

                        this.onOrderClick(this.app.orders[this.app.orders.length-1]);
                        //read data and write into list
                    });

                } else if (status.denied) {
                    // camera permission was permanently denied
                    // you must use QRScanner.openSettings() method to guide the user to the settings page
                    // then they can grant the permission from there
                    this.qrScanner.openSettings();
                } else {
                    // permission was denied, but not permanently. You can ask for permission again at a later time.
                }
            })
            .catch((e: any) => console.log('Error is', e));
    }

    findBelongingOrderItem(idInt: number, amountInt: number): OrderItem {
        let item = this.app.items.find(x => x.id === idInt);
        item.amountInCart = amountInt;
        return item;
    }

    onOrderClick(order: Order) {
        this.router.navigate(['/order/'+order.id])
    }

    ngOnInit() {
        this.app.sortOrdersByDateAndFinished();
    }

    getFormattedDate(order: Order) {
        return this.datepipe.transform(order.date, 'HH:mm')
    }
}




