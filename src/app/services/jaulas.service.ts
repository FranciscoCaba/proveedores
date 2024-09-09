import { Injectable } from '@angular/core';
import { BaseHttpService } from './base.service';
import { Observable } from 'rxjs';
import { Jaulas } from '../models/jaulas.model';

@Injectable({
  providedIn: 'root'
})
export class JaulasService extends BaseHttpService {

  getJaula(idJaula: string) : Observable<Jaulas> {
    return this.http.get<Jaulas>(this.apiUrl+"/jaulas/"+idJaula)
  }

  getJaulas() : Observable<Jaulas[]> {
    return this.http.get<Jaulas[]>(this.apiUrl+"/jaulas")
  }
  
  createJaula(body: Jaulas) : Observable<Jaulas> {
    return this.http.post<Jaulas>(this.apiUrl+'/jaulas', body)
  }

  editJaula(body: Jaulas) : Observable<Jaulas> {
    return this.http.put<Jaulas>(this.apiUrl+'/jaulas/'+body.id, body)
  }
  
  deleteJaula(idJaula: string) : Observable<Jaulas> {
    return this.http.delete<Jaulas>(this.apiUrl+'/jaulas/'+idJaula)
  }
}
