import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  selectedProduct: Product;
  products: Product[];

  readonly URL_API = 'http://localhost:4000/api/product';

  constructor(private http: HttpClient) {
    this.selectedProduct = new Product();
  }

  postImage(product: Product, file: File){
    const formData: FormData = new FormData();
    formData.append('id_product', product.id_product);
    formData.append('image', file, file.name);
    return this.http.post(this.URL_API+'/image', formData);
  }

  deleteImage(image: string){    
    return this.http.delete(this.URL_API+`/image/${image}`);
  }

  postProduct(product: Product, files: Set<File>) {
    const formData: FormData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('code', product.code);
    formData.append('price', product.price);
    formData.append('brand', product.brand);
    formData.append('id_company', product.id_company);
    formData.append('id_category', product.id_category);
    formData.append('id_tax', product.id_tax);
    files.forEach(element => {
      formData.append('image', element, element.name);
    });

    return this.http.post(this.URL_API, formData);
  }

  getProduct(){
    return this.http.get(this.URL_API);
  }

  putProduct(product: Product) {
    return this.http.put(this.URL_API+`/${product.id_product}`, product);
  }

  putStock(id: any, data: any){
    return this.http.put(this.URL_API+`/stock/${id}`, data);
  }
}
