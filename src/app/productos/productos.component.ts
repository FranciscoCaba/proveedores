import { Component, inject } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Productos } from '../models/productos.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  private productoService = inject(ProductosService)
  productos: Productos[] = []
  nombreFiltro: string = ''

  constructor(private router: Router) {}

  ngOnInit (){
    this.obtenerProductos()
  }

  obtenerProductos(): void {
    this.productoService.getProductos().subscribe(
      res => {
        if (this.nombreFiltro !== '') {
          this.productos = res.filter( item => item.nombre.toLowerCase().includes(this.nombreFiltro.toLowerCase()))
        } else {
          this.productos = res
        }
      }
    )
  }

  filtrar(nombre: string, event: any): void {
    event.preventDefault();
    this.nombreFiltro = nombre
    this.obtenerProductos()
  }
  
  editarProducto(idProducto: string): void {
    this.router.navigate(['/productos/edit/'+idProducto])
  }

  eliminarProducto(idProducto: string): void {
    const confirmacion = confirm("¿Estás seguro de que quieres eliminar el elemento?")
    if (confirmacion){
      this.productoService.deleteProducto(idProducto).subscribe( (res) => {
        if (res) {
          alert("Eliminado")
          this.obtenerProductos()
        }
      })
    }
  }
}
