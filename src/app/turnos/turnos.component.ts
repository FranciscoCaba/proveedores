import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TurnosService } from '../services/turnos.service';
import { Turnos } from '../models/turnos.model';
import { Proveedores } from '../models/proveedores.model';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.css'
})
export class TurnosComponent {
  private turnoService = inject(TurnosService)
  turnos: Turnos[] = []
  proveedores: Proveedores[] = [new Proveedores()]
  dict = {}

  constructor(private router: Router) {}

  ngOnInit (){
    this.obtenerTurnos()
  }

  obtenerTurnos(): void {
    this.turnoService.getTurnos().subscribe(
      res => this.turnos = res
    )
  }
  
  editarTurno(idTurno: string): void {
    this.router.navigate(['/turnos/edit/'+idTurno])
  }

  eliminarTurno(idTurno: string): void {
    const confirmacion = confirm("¿Estás seguro de que quieres eliminar el elemento?")
    if (confirmacion){
      this.turnoService.deleteTurno(idTurno).subscribe( (res) => {
        if (res) {
          alert("Eliminado")
          this.obtenerTurnos()
        }
      })
    }
  }

  verDetalle(idTurno: string): void {
    this.router.navigate(['/detalle/add/'+idTurno])
  }
}
