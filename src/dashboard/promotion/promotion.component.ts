import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PromotionService } from '../services/promotion.service';
import { Promotion } from '../models/promotion';
import { subscribeOn } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.sass'],
  providers: [ PromotionService ]
})
export class PromotionComponent implements OnInit {
  ngForm: any;

  constructor(public promotionService: PromotionService, public fb: FormBuilder ) {
    this.ngForm = this.fb.group({
      'name': ['', [ Validators.minLength(3)]],
      'description': ['', [Validators.required]],
      'percentage': ['', [Validators.required]],
      'start_date': ['', [Validators.required]],
      'end_date': ['', [Validators.required]]
    });
   }

  ngOnInit() {
    this.getPromotions();
  }

  addPromotion(form: NgForm){
   if(form.valid){
    if(this.promotionService.selectedPromotion.id_promotion) {
      this.promotionService.putPromotion(this.promotionService.selectedPromotion)
        .subscribe(res => {
          this.resetForm(form);
          this.getPromotions();
        });
    } else {
      this.promotionService.postPromotion(form.value)
        .subscribe(res => {
          this.getPromotions();
          this.resetForm(form);
        });
    }
   }
  }

  editPromotion(promotion: Promotion){
    this.promotionService.selectedPromotion = promotion;
  }

  resetForm(form?: NgForm) {
    if(form) {
      form.reset();
      this.promotionService.selectedPromotion = new Promotion();
    }
  }

  getPromotions(){
    this.promotionService.getPromotion()
      .subscribe(res => {
        this.promotionService.promotions = res as Promotion[];
      });
  }
}
