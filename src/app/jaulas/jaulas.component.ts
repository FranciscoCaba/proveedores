import { Component, inject } from '@angular/core';
import { JaulasService } from '../services/jaulas.service';
import { Jaulas } from '../models/jaulas.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-jaulas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './jaulas.component.html',
  styleUrl: './jaulas.component.css'
})
export class JaulasComponent {
  private jaulaService = inject(JaulasService)
  jaulas: Jaulas[] = []
  nombreFiltro: string = ''

  constructor(private router: Router) {}

  ngOnInit (){
    this.obtenerJaulas()
  }

  obtenerJaulas(): void {
    this.jaulaService.getJaulas().subscribe(
      res => {
        if (this.nombreFiltro !== '') {
          this.jaulas = res.filter( item => item.nombre.toLowerCase().includes(this.nombreFiltro.toLowerCase()))
        } else {
          this.jaulas = res
        }
      }
    )
  }
  
  filtrar(nombre: string, event: any): void {
    event.preventDefault();
    this.nombreFiltro = nombre
    this.obtenerJaulas()
  }
  
  editarJaula(idJaula: string): void {
    this.router.navigate(['/jaulas/edit/'+idJaula])
  }

  eliminarJaula(idJaula: string): void {
    const confirmacion = confirm("¿Estás seguro de que quieres eliminar el elemento?")
    if (confirmacion){
      this.jaulaService.deleteJaula(idJaula).subscribe( (res) => {
        if (res) {
          alert("Eliminado")
          this.obtenerJaulas()
        }
      })
    }
  }
}
