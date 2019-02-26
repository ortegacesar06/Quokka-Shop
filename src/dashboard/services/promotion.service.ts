import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Promotion } from '../models/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  selectedPromotion: Promotion;
  promotions: Promotion[];

  readonly URL_API = 'http://localhost:4000/api/promotion';
  
  constructor(private http: HttpClient) { 
    this.selectedPromotion = new Promotion();
  }

  postPromotion(promotion: Promotion) {
    return this.http.post(this.URL_API, promotion);
  }

  getPromotion(){
    return this.http.get(this.URL_API);
  }

  putPromotion(promotion: Promotion){
    return this.http.put(this.URL_API+`/${promotion.id_promotion}`, promotion);
  }
}
