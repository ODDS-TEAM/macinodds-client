import { Injectable } from '@angular/core';
import { Token } from '../shared/token';
import * as JWT from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CheckRoleTokenService {

  constructor() { }
  checkRoleByToken() {
    let tokenDecode: Token;
    const token = sessionStorage.getItem('token');
    tokenDecode = JWT(token);
    return  tokenDecode.role;
  }
}
