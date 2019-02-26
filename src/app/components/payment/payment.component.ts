import { Component, OnInit, ViewChild } from '@angular/core';
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CartService } from '../../services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertsService } from 'angular-alert-module';

import { Cart } from 'src/app/models/cart';
import { Account } from 'src/app/models/account';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Shipping } from 'src/app/models/shipping';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass']
})
export class PaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  
  shipping: Shipping;

  isAuth = false;
  isLoading = false;
  account: Account;

  hasShip = false;
  isCard = true;

  taxCart: number = 0;
  totalCart: number = 0;

  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#aaadb1'
        }
      }
    }
  };
 
  elementsOptions: ElementsOptions = {
    locale: 'es'
  };
 
  stripeForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private cartService: CartService,
    private authService: AuthService,
    private alerts: AlertsService,
    private router: Router
  ) {
    this.account = new Account();
    this.shipping = new Shipping();
  }

  ngOnInit() {
    this.stripeForm = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.verifySession();
    this.getUserInfo();
    this.alerts.setDefaults('timeout',2);
  }

  toggleShip(input: any){
    input.value
    this.hasShip = !this.hasShip;
  }

  tooglePayment(input: any){
    this.isCard = !this.isCard;    
  }

  buy() {
    this.isLoading = true;
    if(this.cartService.cart.length > 0){
      if(this.isCard){
        const name = this.account.Person.first_name + ' ' + this.account.Person.last_name;
        this.stripeService
          .createToken(this.card.getCard(), { name })
          .subscribe(result => {
            if (result.token) {
              console.log(result.token.id);
              var total =  this.totalCart + this.taxCart;
              var amount = total.toFixed(2).toString().replace(/[.,\s]/g, '')
              var data = {
                token: result.token.id,
                amount: parseInt(amount),
                tax: parseFloat(this.taxCart.toFixed(2)),
                total: parseFloat(total.toFixed(2)),
                isCard: this.isCard,
                hasShip: this.hasShip,
                ship: this.shipping
              }
              this.cartService.processPurchase(data).subscribe(
                data => {
                  console.log(data);            
                  this.isLoading = false;
                  this.alerts.setMessage('La compra se ha realizado con éxito.','success');    
                  this.router.navigate(['/done']);
                }, err => {
                  this.alerts.setMessage('Ha ocurrido un error. Vuelva a intentarlo mas tarde.','error');
                  this.isLoading = false;
                }
              );
            } else if (result.error) {
              this.alerts.setMessage(result.error.message,'error');
              //console.log(result.error.message);          
              this.isLoading = false;
            }
          });
      }else{
        var total =  this.totalCart + this.taxCart;
        var data = {
          tax: parseFloat(this.taxCart.toFixed(2)),
          total: parseFloat(total.toFixed(2)),
          hasShip: this.hasShip,
          ship: this.shipping
        }
        this.cartService.processPurchase(data).subscribe(
          data => {
            console.log(data); 
            this.alerts.setMessage('La compra se ha realizado con éxito.','success');             
            this.isLoading = false;
            this.router.navigate(['/done']);
          }, err => {
            this.alerts.setMessage('Ha ocurrido un error. Vuelva a intentarlo mas tarde.','error');
            //console.log(err);
            this.isLoading = false;
          }
        );
      }
    }else{
      this.alerts.setMessage('No hay items para procesar.','error');
      this.isLoading = false;
    }
      
  }

  getCart(){
    if(this.isAuth){
      this.cartService.getCart()
        .subscribe(res => {
          this.cartService.cart = res as Cart[];
          this.setTotalValues(this.cartService.cart);
        });
    }
  }

  setTotalValues(array: Cart[]) {
    this.totalCart = 0;
    array.forEach(element => {
      this.totalCart += parseFloat(element.pt as any);
    });
    this.taxCart = this.totalCart * 0.12;
  }

  verifySession(){
    this.authService.isAuth()
      .subscribe(res => {
        var re = res as any;
        this.isAuth = re.res;
        this.getCart();
      });
  }

  getUserInfo(){
    this.authService.getUserInfo()
      .subscribe(res => {
        this.account = res as Account;
      });
  }

  initSession(event:any){
    if(!this.isAuth){
      this.router.navigate(['/login']);
    }
    event.preventDefault();
  }

  logout(){
    this.authService.logout()
      .subscribe(res => {
        this.router.navigate(['/']);
      });
  }
}
