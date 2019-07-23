import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MacinoddsApiService } from '../macinodds-api.service';
import { Observable } from 'rxjs';
import * as JWT from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    private route: Router,
  ) { }

  role = localStorage.getItem('role');

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const expectedRole = next.data.expectedRole;
    const token = sessionStorage.getItem('token');
    const decode = JWT(token);
    // const tokenPayload = decode(token);

    if ( this.role !== expectedRole) {
      this.route.navigate(['/404']);
      // console.log('tokenplayload +++++++++++++++++ ' + tokenPayload);

      return false;
    } 
    // console.log('tokenplayload.role +++++++++++++++++ ' + tokenPayload.role);
    // // console.log('tokenplayload +++++++++++++++++ ' + tokenPayload.role);
    // console.log('tokenplayload +++++++++++++++++ ' + tokenPayload);

    return true;
    
  }
}
