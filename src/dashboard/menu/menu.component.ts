import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  account: Account;

  constructor(private authService: AuthService) {
    this.account = new Account();
  }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo(){
    this.authService.getUserInfo()
      .subscribe(res => {
        this.account = res as Account;
        console.log(this.account);
      });
  }

}
