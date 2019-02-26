import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TaxService } from '../services/tax.service';
import { Tax } from '../models/tax';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.sass'],
  providers: [ TaxService ]
})
export class TaxComponent implements OnInit {

  constructor(public taxService: TaxService) { }

  ngOnInit() {
    this.getTaxs();
  }

  addTax(form: NgForm){
    if(this.taxService.selectedTax.id_tax) {
      this.taxService.putTax(this.taxService.selectedTax)
        .subscribe(res =>{
          this.resetForm(form);
          this.getTaxs();
        });
    } else{
      this.taxService.postTax(form.value)
        .subscribe(res => {
           this.getTaxs();
           this.resetForm(form);
        });
    }
  }

  editTax(tax: Tax) {
    this.taxService.selectedTax = tax;
  }

  resetForm(form?: NgForm) {
    if(form) {
      form.reset();
      this.taxService.selectedTax = new Tax();
    }
  }

  getTaxs() {
    this.taxService.getTax()
      .subscribe(res => {
        this.taxService.taxs = res as Tax[];
      });
  }

}
