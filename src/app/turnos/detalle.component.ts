import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DetalleTurnoService } from '../services/detalle-turno.service';
import { TurnosDetalle } from '../models/turnos-detalle.model';

@Component({
    selector: 'app-detalle',
    standalone: true,
    imports: [RouterLink],
    template: `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Productos</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mask d-flex align-items-center h-100">
                            <div class="container">
                                <div class="row justify-content-center">
                                    <div class="col-12">
                                        <div class="card mt-3">
                                            <div class="card-body p-0">
                                                <div class="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style="position: relative; height: 700px">
                                                    <table class="table table-striped mb-0">
                                                    <thead style="background-color: #002d72;">
                                                        <tr>
                                                            <th scope="col">Producto</th>
                                                            <th scope="col">Cantidad</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        @for (item of detalles; track $index) {
                                                            <tr>
                                                                <td>{{ item.idProducto }}</td>
                                                                <td>{{ item.cantidad }}</td>
                                                            </tr>
                                                        } @empty {
                                                            <tr>
                                                                <td>No hay productos</td>
                                                                <td></td>
                                                            </tr>
                                                        }
                                                    </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" data-bs-dismiss="modal" (click)="verDetalle(idTurno)">Agregar</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrl: './turnos.component.css'
})
export class DetalleComponent implements OnInit, OnChanges {
    @Input() idTurno : string = ''
    @Input() visible : boolean = false
    private detalleService = inject(DetalleTurnoService)
    detalles: TurnosDetalle[] = []

    constructor(private router: Router) {}

    ngOnInit (){
        this.obtenerDetalles()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["idTurno"]) {
            this.obtenerDetalles()
        }
    }

    obtenerDetalles(): void {
        this.detalleService.getDetalles().subscribe(
            res => this.detalles = res.filter( item => item.idTurno === this.idTurno)
        )
    }

    verDetalle(idTurno: string): void {
        this.router.navigate(['/detalle/add/'+idTurno])
    }
}
