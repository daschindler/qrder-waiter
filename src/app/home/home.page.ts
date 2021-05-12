import {Component} from '@angular/core';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import {Router} from "@angular/router";
import {MenuItem} from "../data/MenuItem";
import {Order} from "../data/Order";
import { AppComponent } from '../app.component';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(private qrScanner: QRScanner, private router: Router, public appComponent: AppComponent) {
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
                        this.qrScanner.hide();
                        scanSub.unsubscribe(); // stop scanning

                        this.onOrderClick(this.appComponent.orders[0]);
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

    ngOnInit() {
        this.appComponent.sortOrdersByDateAndFinished();
    }
}


