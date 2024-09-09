import { Injectable } from '@angular/core';
import { TurnosDetalle } from '../models/turnos-detalle.model';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleTurnoService extends BaseHttpService {
  getDetalles() : Observable<TurnosDetalle[]> {
    return this.http.get<TurnosDetalle[]>(this.apiUrl+"/turnos_detalle")
  }
  
  createDetalle(body: TurnosDetalle) : Observable<TurnosDetalle> {
    return this.http.post<TurnosDetalle>(this.apiUrl+'/turnos_detalle', body)
  }
}
