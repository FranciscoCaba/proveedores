import { Injectable } from '@angular/core';
import { Proveedores } from '../models/proveedores.model';
import { mergeMap, Observable } from 'rxjs';
import { BaseHttpService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService extends BaseHttpService {

  getProveedor(idProveedor: number) : Observable<Proveedores> {
    return this.http.get<Proveedores>(this.apiUrl+"/proveedores/"+idProveedor)
  }

  getProveedores() : Observable<Proveedores[]> {
    return this.http.get<Proveedores[]>(this.apiUrl+"/proveedores")
  }

  createProveedor(body: Proveedores) : Observable<Proveedores> {
    return this.http.post<Proveedores>(this.apiUrl+'/proveedores', body)
  }

  editProveedor(body: Proveedores) : Observable<Proveedores> {
    console.log(body);
    
    return this.http.put<Proveedores>(this.apiUrl+'/proveedores/'+body.id, body)
  }
  
  deleteProveedor(idProveedor: string) : Observable<Proveedores> {
    return this.http.delete<Proveedores>(this.apiUrl+'/proveedores/'+idProveedor)
  }
}
