import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Company } from '../models/company';
import { Countrys } from '../models/countrys';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  selectedCompany: Company;
  companys: Company[];
  countrys: Countrys[];

  readonly URL_API = 'http://localhost:4000/api/company';
  readonly URL_COUNTRY = 'https://restcountries.eu/rest/v2/all';

  constructor(private http: HttpClient) {
    this.selectedCompany = new Company();
  }

  postCompany(company: Company) {
    return this.http.post(this.URL_API, company);
  }

  getCompany(){
    return this.http.get(this.URL_API);
  }
  

  putCompany(company: Company) {
    return this.http.put(this.URL_API+`/${company.id_company}`, company);
  }

  getCountry() {
    return this.http.get(this.URL_COUNTRY);
  }

}
