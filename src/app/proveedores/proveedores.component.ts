import { Component, inject } from '@angular/core';
import { ProveedoresService } from '../services/proveedores.service';
import { Proveedores } from '../models/proveedores.model';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {
  private proveedorService = inject(ProveedoresService)
  proveedores: Proveedores[] = []

  constructor(private router: Router) {}

  ngOnInit (){
    this.obtenerProveedores()
  }

  obtenerProveedores(): void {
    this.proveedorService.getProveedores().subscribe(
      res => this.proveedores = res
    )
  }

  editarProveedor(idProveedor: string): void {
    this.router.navigate(['/proveedores/edit/'+idProveedor])
  }

  eliminarProveedor(idProveedor: string): void {
    const confirmacion = confirm("¿Estás seguro de que quieres eliminar el elemento?")
    if (confirmacion){
      this.proveedorService.deleteProveedor(idProveedor).subscribe( (res) => {
        if (res) {
          alert("Eliminado")
          this.obtenerProveedores()
        }
      })
    }
  }
}
