import { inject, Injectable } from '@angular/core';
import { ApiCommonService } from '../data/datasource/api-common.service';
import { delay, Observable } from 'rxjs';

export interface Users {
  success: boolean;
  message: string;
  total_users: number;
  offset: number;
  limit: number;
  users: Array<User>;
}

export interface User {
  id: number;
  last_name: string;
  first_name: string;
  street: string;
}

@Injectable({
  providedIn: 'root'
})
export class FakeService {
  api = inject(ApiCommonService);
  
  getFakeUsers(skipLoading?: boolean): Observable<Users> {
    return  this.api.get<Users>('https://api.slingacademy.com/v1/sample-data/users', null, skipLoading);
  }
}