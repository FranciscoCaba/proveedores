import { Component, inject } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Productos } from '../models/productos.model';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  private proveedorService = inject(ProductosService)
  productos: Productos[] = []

  ngOnInit (){
    this.obtenerProductos()
  }

  obtenerProductos(): void {
    this.proveedorService.getProductos().subscribe(
      res => this.productos = res
    )
  }
}
