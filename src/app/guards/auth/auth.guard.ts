import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let url: string = state.url;
    
    return this.authService.isAuth().pipe(map(res => {
      
      this.authService.redirectURL = url;
      var re = res as any;
      if(re.res){
        if(url.includes('dashboard')){
          if(re.role == 1){
            return true;
          }else{
            this.router.navigate(['/']);
          }
        }else{
          if(url.includes('login')){
            this.router.navigate(['/']);
          }else{
            return true;
          }          
        }        
      }else{
        this.router.navigate(['/login']);
      }          
    }));
  }
}
