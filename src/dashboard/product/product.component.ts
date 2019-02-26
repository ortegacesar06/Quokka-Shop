import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProductService } from '../services/product.service';
import { CompanyService } from '../services/company.service';
import { CategoryService } from '../services/category.service';
import { TaxService } from '../services/tax.service';
import { Product } from '../models/product';
import { Company } from '../models/company';
import { Category } from '../models/category';
import { Tax } from '../models/tax';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Image } from '../models/image';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ValidationService} from '../services/validation.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass'],
  providers: [ ProductService , CompanyService, CategoryService, TaxService]
})
export class ProductComponent implements OnInit { 
  files: Set<File> = new Set();
  imageList: Set<any> = new Set();
  product : Product;
  isEmpty = false;
  modal_title = '';
  ngForm: any;

  constructor(public modalService: NgbModal, 
    public productService: ProductService, 
    public companyService: CompanyService, 
    public categoryService: CategoryService, 
    public taxService: TaxService,
    public fb: FormBuilder) {
    this.product = new Product();

    this.ngForm = this.fb.group({
      'name': ['', [Validators.required, ValidationService.nombre]],
      'code':['', [Validators.required]],
      'price':['', [Validators.required]],
      'brand':['', [Validators.required]],
      'company':['', [Validators.required]],
      'category':['', [Validators.required]],
      'tax':['', [Validators.required]],
      'description':['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.getProducts();
    this.getCompanys();
    this.getCategorys();
    this.getTaxs();
  }

  addStock(input: any, id:any){
    var data = { stock: parseInt(input.value) }
    this.productService.putStock(id.value, data)
      .subscribe(res => {
        console.log(res);
        this.getProducts();
        this.modalService.dismissAll();
      });
  }

  openModalStock(content){
    this.modal_title = 'Añadir Existencia';
    this.modalService.open(content, { centered: true });
  }

  openModal(content){
    this.modal_title = 'Añadir Producto';
    this.product = new Product();
    this.files.clear();
    this.imageList.clear();
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  onFilesAdded(input: any){
    const files: { [key: string]: File } = input.files;
    for(let key in files){
      if(!isNaN(parseInt(key))){
        if(!this.product.id_product){
          this.files.add(files[key]);
        
          var reader = new FileReader();
          reader.readAsDataURL(input.files[0]);
          reader.onload = (event: any) => {
            var item = [event.target.result, files[key]];
            this.imageList.add(item);
          }
        }else{
          this.productService.postImage(this.product, files[key]).pipe(first())
            .subscribe(
              data =>{
                this.product.Images.push(data as Image);
              }, error => {
                console.log(error);
              }
            );
        }
      }
    }
  }

  deleteFile(file: any){
    if(!this.product.id_product){
      this.imageList.delete(file);
      this.files.delete(file[1]);
    }else{
      this.productService.deleteImage(file.id_image).pipe(first())
        .subscribe(
          data => {
            var index = this.product.Images.indexOf(file);
            this.product.Images.splice(index, 1);
          }, error =>{
            console.log(error);
          }
        )
    }
  }

  addProduct(form: NgForm){
    if(form.valid){
      if(this.product.id_product) {
        this.productService.putProduct(this.product)
          .subscribe(res => {
            this.product = new Product;
            this.getProducts();
            this.modalService.dismissAll();
          });
      } else {
        this.productService.postProduct(this.product, this.files)
          .subscribe(res => {
            this.product = new Product;
            this.getProducts();
            this.modalService.dismissAll();
          });
      } 
    }
  }

  editProduct(product: Product, content) {
    this.modal_title = 'Editar Producto';
    this.product = product;
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  resetForm(form?: NgForm) {
    this.product = new Product;
  }

  getProducts() {
    this.productService.getProduct()
      .subscribe(res => {
        this.productService.products = res as Product[];
        this.isEmpty = !(this.productService.products.length > 0);
      });
    
  }

  getCompanys(){
    this.companyService.getCompany()
      .subscribe(res => {
      this.companyService.companys = res as Company[];
    });
  }

  getCategorys(){
    this.categoryService.getCategory()
      .subscribe(res => {
      this.categoryService.categorys = res as Category[];
    });
  }

  getTaxs(){
    this.taxService.getTax()
      .subscribe(res => {
      this.taxService.taxs = res as Tax[];
    });
  }


}
