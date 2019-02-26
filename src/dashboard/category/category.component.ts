import { Component, OnInit } from '@angular/core';

import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CategoryService } from "../services/category.service";
import { Category } from "../models/category";


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  modal_title = '';
  public form: any;
  constructor(public modalService: NgbModal,
     public categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getCategorys();
    
  }

  openModal(content){
    this.modal_title = 'Añadir Producto';
    this.modalService.open(content, { centered: true }).result.then((res)=>{
      this.resetForm(res);
    });
  }

  addCategory(form?: NgForm){
    if(form.invalid){
      return false;
    }else{
      if(this.categoryService.selectedCategory.id_category){
        this.categoryService.putCategory(this.categoryService.selectedCategory)
          .subscribe(res =>{
            this.resetForm(form);
            this.modalService.dismissAll();
            this.getCategorys();
        });
      }else{
        this.categoryService.postCategory(form.value)
        .subscribe(res => {
          this.getCategorys();
          this.modalService.dismissAll();
          this.resetForm(form);
        })
    }
    }
  }
  getCategorys(){
    this.categoryService.getCategory()
    .subscribe(res =>{
      this.categoryService.categorys = res as Category[];
    });
  }

  editCategory(category: Category){
    this.categoryService.selectedCategory = category;

  }

  resetForm(form?: NgForm) {
    if(form) {
      form.reset();
      this.categoryService.selectedCategory = new Category();
    }
  }
  
}