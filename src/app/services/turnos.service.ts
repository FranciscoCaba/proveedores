import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base.service';
import { Turnos } from '../models/turnos.model';

@Injectable({
  providedIn: 'root'
})
export class TurnosService extends BaseHttpService {
  getTurno(idTurno: number) : Observable<Turnos> {
    return this.http.get<Turnos>(this.apiUrl+"/turnos/"+idTurno)
  }

  getTurnos() : Observable<Turnos[]> {
    return this.http.get<Turnos[]>(this.apiUrl+"/turnos")
  }
  
  createTurno(body: Turnos) : Observable<Turnos> {
    return this.http.post<Turnos>(this.apiUrl+'/turnos', body)
  }

  editTurno(body: Turnos) : Observable<Turnos> {
    return this.http.put<Turnos>(this.apiUrl+'/turnos/'+body.id, body)
  }
  
  deleteTurno(idTurno: string) : Observable<Turnos> {
    return this.http.delete<Turnos>(this.apiUrl+'/turnos/'+idTurno)
  }
}
