import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var paypal:any;

@Component({
  selector: 'app-paypal-payment',
  templateUrl: './paypal-payment.component.html',
  styleUrls: ['./paypal-payment.component.css']
})
export class PaypalPaymentComponent implements OnInit {

  @ViewChild('paypal', { static:true }) paypalElement!: ElementRef;

  product = {
    price: 200,
    description: '50 tokens'
  };

  constructor() { }

  ngOnInit(): void {
    paypal
        .Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: 'USD',
                    value: this.product.price
                  }
                }
              ]
            });
          },
          onApprove: async (data: any, actions: any) => {
            const order = await actions.order.capture();
            console.log(order);
          }
        })
        .render(this.paypalElement.nativeElement);
  }

}
