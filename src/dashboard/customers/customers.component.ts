import { Component, OnInit } from '@angular/core';
import { RegisterPersonService } from '../../app/services/register-person.service';
import { RegisterPerson } from '../../app/models/register-person';
import { Account } from '../../app/models/account';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.sass'],
  providers: [ RegisterPersonService ]
})
export class CustomersComponent implements OnInit {

  constructor(public registerPersonService: RegisterPersonService) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers(){
    this.registerPersonService.getRegisterPerson()
      .subscribe(res => {
        this.registerPersonService.persons = res as RegisterPerson[];
      });
  }
 
  editState(customer: Account){
    const newCustomer = {
      id_account:  customer.id_account,
      user_name: customer.user_name,
      email: customer.email,
      password: customer.password,
      secure_token: customer.secure_token,
      phone_number: customer.phone_number,
      id_person: customer.id_person,
      state: !customer.state,
      Person: customer.Person
    };
    this.registerPersonService.putAccount(newCustomer)
    .subscribe(res => {
      customer.state = !customer.state;
      this.getCustomers();
    });
  }

}
