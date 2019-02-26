import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { RegisterPersonService } from '../../services/register-person.service';
import { RegisterPerson } from '../../models/register-person';
import { Account } from '../../models/account';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-register-person',
  templateUrl: './register-person.component.html',
  styleUrls: ['./register-person.component.sass'],
  providers: [ RegisterPersonService ]

})
export class RegisterPersonComponent implements OnInit {

  constructor(public registerPersonService: RegisterPersonService, private alertService: AlertService) { }

  ngOnInit() {
  }

  addRegisterPerson(form: NgForm){
    form.value.id_role = '4';
    this.registerPersonService.postRegisterPerson(form.value)
      .subscribe(data => {
        this.resetForm(form);
      }, error => {
        this.alertService.error("Este Usuario ya existe.");
      });
  }

  resetForm(form?: NgForm) {
    if(form) {
      form.reset();
      
    }
  }


}
