import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base.service';
import { Productos } from '../models/productos.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService extends BaseHttpService {

  getProductos() : Observable<Productos[]> {
    return this.http.get<Productos[]>(this.apiUrl+"/productos")
  }
}
