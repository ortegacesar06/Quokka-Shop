import { Injectable } from '@angular/core';

import { Product } from '../../dashboard/models/product';
import { Category } from '../../dashboard/models/category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[];
  featured: Product[];

  readonly URL_API = 'http://localhost:4000/api/product/';
  
  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get(this.URL_API);
  }

  getFeatured(){
    return this.http.get(this.URL_API+'featured');
  }
}
