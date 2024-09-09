import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base.service';
import { Productos } from '../models/productos.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService extends BaseHttpService {

  getProducto(idProducto: number) : Observable<Productos> {
    return this.http.get<Productos>(this.apiUrl+"/productos/"+idProducto)
  }

  getProductos() : Observable<Productos[]> {
    return this.http.get<Productos[]>(this.apiUrl+"/productos")
  }
  
  createProducto(body: Productos) : Observable<Productos> {
    return this.http.post<Productos>(this.apiUrl+'/productos', body)
  }

  editProducto(body: Productos) : Observable<Productos> {
    return this.http.put<Productos>(this.apiUrl+'/productos/'+body.id, body)
  }
  
  deleteProducto(idProducto: string) : Observable<Productos> {
    return this.http.delete<Productos>(this.apiUrl+'/productos/'+idProducto)
  }
}
