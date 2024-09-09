import { Component, inject } from '@angular/core';
import { ProveedoresService } from '../services/proveedores.service';
import { Proveedores } from '../models/proveedores.model';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {
  private proveedorService = inject(ProveedoresService)
  proveedores: Proveedores[] = []

  ngOnInit (){
    this.obtenerProveedores()
  }

  obtenerProveedores(): void {
    this.proveedorService.getProveedores().subscribe(
      res => this.proveedores = res
    )
  }
}
