import { Injectable } from '@angular/core';
import { Proveedores } from '../models/proveedores.model';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService extends BaseHttpService {

  getProveedores() : Observable<Proveedores[]> {
    return this.http.get<Proveedores[]>(this.apiUrl+"/proveedores")
  }
}
