import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TurnosService } from '../services/turnos.service';
import { Turnos } from '../models/turnos.model';
import { Proveedores } from '../models/proveedores.model';
import { DetalleComponent } from './detalle.component';
import { Jaulas } from '../models/jaulas.model';
import { JaulasService } from '../services/jaulas.service';
import { FormsModule } from '@angular/forms';
import { ProveedoresService } from '../services/proveedores.service';

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
  private proveedorService = inject(ProveedoresService)
  turno: Turnos = new Turnos()
  turnos: Turnos[] = [new Turnos()]
  jaula: Jaulas = new Jaulas()
  jaulas: Jaulas[] = [new Jaulas()]
  idTurno: string = '1'
  idJaula: string = '1'
  fechaFiltro: string = ''
  jaulasDict: {[key: string]: string } = {}
  proveedoresDict: {[key: string]: string } = {}

  constructor(private router: Router) {}

  ngOnInit (){
    this.obtenerTurnos()
    this.obtenerJaulas()
    this.obtenerProveedores()
  }
  
  obtenerTurnos(): void {
    this.turnoService.getTurnos().subscribe(
      res => {
        if (this.fechaFiltro !== '') {
          this.turnos = res.filter( item => item.fecha === this.fechaFiltro)
        } else {
          this.turnos = res
        }
      }
    )
  }

  obtenerJaulas(): void {
    this.jaulaService.getJaulas().subscribe(
      res => {
        this.jaulas = res.filter( item => !item.enUso )
        for (let i = 0; i < res.length; i++) {
          this.jaulasDict[res[i].id] = res[i].nombre
        }
      }
    )
  }

  obtenerProveedores(): void {
    this.proveedorService.getProveedores().subscribe(
      res => {
        for (let i = 0; i < res.length; i++) {
          this.proveedoresDict[res[i].id] = res[i].nombre
        }
      }
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
          
          this.jaulaService.editJaula(this.jaula).subscribe(
            res => this.obtenerJaulas()
          )
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

      this.jaulaService.getJaula(this.turno.idJaula).subscribe(
        res => {
          this.jaula = res
          this.jaula.enUso = false

          this.jaulaService.editJaula(this.jaula).subscribe(
            res => this.obtenerJaulas()
          )

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

  seleccionarTurno(id: string): void {
    this.idTurno = id
  }

  seleccionarJaula(id: string): void {
    this.idJaula = id
  }

}
