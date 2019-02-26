import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { CategoryService } from 'src/dashboard/services/category.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertsService } from 'angular-alert-module';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Product } from 'src/dashboard/models/product';
import { Category } from 'src/dashboard/models/category';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass'],
  providers: [ProductService, CategoryService, CartService]
})
export class MainPageComponent implements OnInit {
  isEmptyProd = false;
  isEmptyFeat = false;
  isEmptyCate = false;
  isAuth = false;

  cartLength = 0;
  taxCart: number = 0;
  totalCart: number = 0;

  constructor(public modalService: NgbModal, 
    private productService: ProductService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private cartService: CartService,
    private alerts: AlertsService,
    private router: Router) {
    }

  ngOnInit() {
    this.verifySession();
    this.getFeatured();
    this.getProducts();
    this.getCategories();
    this.alerts.setDefaults('timeout',2);
  }

  initSession(event:any){
    if(!this.isAuth){
      this.router.navigate(['/login']);
    }
    event.preventDefault();
  }

  addToCart(external: string){
    if(this.isAuth){
      this.cartService.addItem(external)
      .subscribe(res => {
        this.cartService.cart = res as Cart[];
        this.cartLength = this.cartService.cart.length;
        this.setTotalValues(this.cartService.cart);
        this.alerts.setMessage('¡Producto Añadido al carrito!','success');
      });
    }else{
      this.router.navigate(['/login']);
    }    
  }

  plusItem(external: string, event: any){
    this.cartService.plusItem(external)
      .subscribe(res =>{
        this.cartService.cart = res as Cart[];
        this.cartLength = this.cartService.cart.length;
        this.setTotalValues(this.cartService.cart);
      });
    event.preventDefault();
  }

  minusItem(external: string, event: any){
    this.cartService.minusItem(external)
      .subscribe(res =>{
        this.cartService.cart = res as Cart[];
        this.cartLength = this.cartService.cart.length;
        this.setTotalValues(this.cartService.cart);
      });
    event.preventDefault();
  }

  getCart(){
    if(this.isAuth){
      this.cartService.getCart()
        .subscribe(res => {
          this.cartService.cart = res as Cart[];
          console.log(res)
          this.cartLength = this.cartService.cart.length;
          this.setTotalValues(this.cartService.cart);
        });
    }
  }

  openCart(content, event:any){
    if(this.isAuth){
      this.modalService.open(content, { centered: true, size: 'lg' });
    }else{
      this.router.navigate(['/login']);
    }
    event.preventDefault();
  }

  getProducts(){
    this.productService.getProducts()
      .subscribe(res => {
        this.productService.products = res as Product[];
        this.isEmptyProd = !(this.productService.products.length > 0);
      })
  }

  getFeatured(){
    this.productService.getFeatured()
      .subscribe(res => {
        this.productService.featured = res as Product[];
        this.isEmptyFeat = !(this.productService.featured.length > 0);
      })
  }

  getCategories(){
    this.categoryService.getCategory()
      .subscribe(res => {
        this.categoryService.categorys = res as Category[];
        this.isEmptyCate = !(this.categoryService.categorys.length > 0);
      })
  }

  verifySession(){
    this.authService.isAuth()
      .subscribe(res => {
        var re = res as any;
        this.isAuth = re.res;
        this.getCart();
      });
  }

  setTotalValues(array: Cart[]){
    this.totalCart = 0;
    array.forEach(element => {
      this.totalCart += parseFloat(element.pt as any);
    });
    this.taxCart = this.totalCart * 0.12;
  }

  logout(){
    this.authService.logout()
      .subscribe(res => {
        location.reload();
      });
  }
}
