import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TurnosService } from '../services/turnos.service';
import { Turnos } from '../models/turnos.model';
import { Proveedores } from '../models/proveedores.model';
import { DetalleComponent } from './detalle.component';
import { Jaulas } from '../models/jaulas.model';
import { JaulasService } from '../services/jaulas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [RouterLink, DetalleComponent, FormsModule],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.css'
})
export class TurnosComponent {
  private turnoService = inject(TurnosService)
  private jaulaService = inject(JaulasService)
  turno: Turnos = new Turnos()
  turnos: Turnos[] = []
  jaula: Jaulas = new Jaulas()
  jaulas: Jaulas[] = [new Jaulas()]
  proveedores: Proveedores[] = [new Proveedores()]
  idTurno: string = '1'
  idJaula: string = '1'
  fechaFiltro: string = ''

  constructor(private router: Router) {}

  ngOnInit (){
    this.obtenerTurnos()
    this.obtenerJaulas()
  }
  
  obtenerTurnos(): void {
    this.turnoService.getTurnos().subscribe(
      res => this.turnos = res.filter( item => item.fecha === this.fechaFiltro)
    )
  }

  obtenerJaulas(): void {
    this.jaulaService.getJaulas().subscribe(
      res => this.jaulas = res.filter( item => !item.enUso )
    )
  }

  filtrar(fecha: string, event: any): void {
    event.preventDefault();
    this.fechaFiltro = fecha
    this.obtenerTurnos()
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

  iniciar(idTurno: string): void {
    this.turnoService.getTurno(idTurno).subscribe( (res) => {
      this.turno = res
      const hoy = new Date()
      this.turno.horaInicioRecepcion = (hoy.getHours())+":"+(hoy.getMinutes())
      this.turno.idJaula = this.jaula.id

      this.jaulaService.getJaula(this.jaula.id).subscribe(
        res => {
          this.jaula = res
          
          this.jaula.enUso = true
          
          this.jaulaService.editJaula(this.jaula).subscribe( (res) => {
            console.log(res)
          })
        }
      )

      this.turnoService.editTurno(this.turno).subscribe((res)=>{
        if(res){
          this.obtenerTurnos()
        }
        else{
          console.log("no funca");
        }
      })
    })
  }

  finalizar(idTurno: string): void {
    this.turnoService.getTurno(idTurno).subscribe( (res) => {
      this.turno = res
      const hoy = new Date()
      this.turno.horaFinRecepcion = (hoy.getHours())+":"+(hoy.getMinutes())
      
      this.turnoService.editTurno(this.turno).subscribe((res)=>{
        if(res){
          this.obtenerTurnos()
        }
        else{
          console.log("no funca");
        }
      })
    })
  }

  seleccionarTurno(id: string): void {
    this.idTurno = id
  }

  seleccionarJaula(id: string): void {
    this.idJaula = id
  }

}
