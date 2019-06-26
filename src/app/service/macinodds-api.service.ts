import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../shared/login';
import { User } from '../shared/user'




@Injectable({
  providedIn: 'root'
})
export class MacinoddsApiService {

  listData: User[] = [];
  siteName: string;
  getCustomerId = new BehaviorSubject<string>(null);
  getProductOwnerId = new BehaviorSubject<string>(null);
  dailyIncome = '';
  id = sessionStorage.getItem('idUser');
  private userId = this.id;
  readonly apiPath = environment.api;
  individualListed: User;
  corporateListed: User;



  constructor(private http: HttpClient) { }

  // getIndividualListed = () => this.individualListed;


  forCheckTokenPleaseRemoveMeIfFlowLoginFinnished(): Observable<any> {
    return Observable.create(observer => {
        const checkTokenInterval = setInterval(() => {
            if (sessionStorage.getItem('token')) {
                observer.next();
                clearInterval(checkTokenInterval);
            }
        }, 200);
    });
}

initDataService() {
  if (this.forCheckTokenPleaseRemoveMeIfFlowLoginFinnished()) {
      this.getListIncomeIndividual().subscribe(individual => {
          this.individualListed = individual;
      });

      this.getListIncomeCorporate().subscribe(corporate => {
          this.corporateListed = corporate;
      });
  }
}

getListIncomeIndividual(): Observable<User> {
  return this.http.get<User>(
      `${this.apiPath}incomes/status/individual`,
      this.getHttpHeaderOption()
  );
}

getListIncomeCorporate(): Observable<User> {
  return this.http.get<User>(
      `${this.apiPath}incomes/status/corporate`,
      this.getHttpHeaderOption()
  );
}



getHttpHeaderOption(): { headers: HttpHeaders } {
  const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('token')
      })
  };
  return httpOptions;
}

// updateUser(id: string, user: User): Observable<User> {
//   return this.http.put<User>(`${this.apiPath}users/${id}`, user,
//       this.getHttpHeaderOption()
//   );
// }


getLoginGoogle(idtoken: string): Observable<Login> {
  return this.http.post<any>(`${this.apiPath}login-google`, { 'token': idtoken });
}



}
