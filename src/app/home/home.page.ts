import {Component} from '@angular/core';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import {Router} from "@angular/router";
import {MenuItem} from "../data/MenuItem";
import {Order} from "../data/Order";


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    items: MenuItem[] = [
        {name: 'Freistaedter', price: 3.8, amount: 0.33},
        {name: 'Stiegl', price: 0.1, amount: 0.5}
    ];

    orders: Order[] = [
        {id: 1, items: this.items},
        {id: 2, items: this.items},
        {id: 3, items: this.items},
        {id: 4, items: this.items},
        {id: 5, items: this.items},
        {id: 6, items: this.items},
        {id: 7, items: this.items},
        {id: 8, items: this.items},
        {id: 9, items: this.items}
    ];

    constructor(private qrScanner: QRScanner, private router: Router) {
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
                        console.log('Scanned something', text);
                        ionApp.style.display = "block";
                        this.qrScanner.hide(); // hide camera preview
                        scanSub.unsubscribe(); // stop scanning

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

    onOrderClick(order: Order) {
        this.router.navigate(['/order/'+order.id])
    }
}
