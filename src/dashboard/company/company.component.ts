import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CompanyService } from '../services/company.service';
import { Company } from '../models/company';
import { Countrys } from '../models/countrys';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.sass'],
  providers: [ CompanyService ]
})
export class CompanyComponent implements OnInit {
  myForm: FormGroup;

  constructor(public companyService: CompanyService,  public fb: FormBuilder) { 
    this.myForm = this.fb.group({
      'name': ['', [Validators.required]],
      'country': ['',[Validators.required]],
      'city': ['',[Validators.required]],
      'address': ['',[Validators.required]]
    });
  }

  ngOnInit() {
    this.getCompanys();
    this.getCountrys();
  }

  addCompany(form: NgForm){
    if(form.valid){
      if(this.companyService.selectedCompany.id_company) {
        this.companyService.putCompany(this.companyService.selectedCompany)
          .subscribe(res => {
            this.resetForm(form);
            this.getCompanys();
          });
      } else {
        this.companyService.postCompany(form.value)
          .subscribe(res => {
            this.getCompanys();
            
          });
      }
    }
  }

  editCompany(company: Company) {
    this.companyService.selectedCompany = company;
    console.log(this.companyService.selectedCompany);
  }

  resetForm(form?: NgForm) {
    if(form) {
      form.reset();
      this.companyService.selectedCompany = new Company();
    }
  }

  getCompanys() {
    this.companyService.getCompany()
      .subscribe(res => {
        this.companyService.companys = res as Company[];
      });
  }

  getCountrys() {
    this.companyService.getCountry()
      .subscribe(res => {
        this.companyService.countrys = res as Countrys[];
      });
  }

}
