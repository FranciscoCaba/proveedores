import { Component, inject } from '@angular/core';
import { JaulasService } from '../services/jaulas.service';
import { Jaulas } from '../models/jaulas.model';

@Component({
  selector: 'app-jaulas',
  standalone: true,
  imports: [],
  templateUrl: './jaulas.component.html',
  styleUrl: './jaulas.component.css'
})
export class JaulasComponent {
  private proveedorService = inject(JaulasService)
  jaulas: Jaulas[] = []

  ngOnInit (){
    this.obtenerJaulas()
  }

  obtenerJaulas(): void {
    this.proveedorService.getJaulas().subscribe(
      res => this.jaulas = res
    )
  }
}
