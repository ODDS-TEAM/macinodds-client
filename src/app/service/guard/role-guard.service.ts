import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MacinoddsApiService } from '../macinodds-api.service';
import { Observable } from 'rxjs';
import { CheckRoleTokenService } from '../check-role-token.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    private route: Router,
    private checkRoleToken: CheckRoleTokenService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRole = next.data.expectedRole;
    if (this.checkRoleToken.checkRoleByToken() !== expectedRole) {
      if(this.checkRoleToken.checkRoleByToken() === 'admin') {
        this.route.navigate(['/admin'])
      } else {
        this.route.navigate(['/user'])
      }
      return false;
    }
    return true;
  }
}
