import { Injectable } from '@angular/core';
import { BaseHttpService } from './base.service';
import { Observable } from 'rxjs';
import { Jaulas } from '../models/jaulas.model';

@Injectable({
  providedIn: 'root'
})
export class JaulasService extends BaseHttpService {

  getJaulas() : Observable<Jaulas[]> {
    return this.http.get<Jaulas[]>(this.apiUrl+"/jaulas")
  }
}
