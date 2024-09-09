import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleTurnoService } from '../services/detalle-turno.service';
import { TurnosDetalle } from '../models/turnos-detalle.model';
import { ProductosService } from '../services/productos.service';
import { Productos } from '../models/productos.model';

@Component({
    selector: 'agregar-detalles',
    standalone: true,
    imports: [FormsModule],
    template: `
        <div class="container mt-3">
            <div class="row justify-content-center">
                <div class="col-xl-5 col-md-8">
                    <div class="rounded shadow-5-strong p-5" style="background-color: lightgray;">
                        <h1 class="mb-4">Crear Detalle</h1>
                        <div class="form-outline mb-4">
                            <label class="form-label" style="font-weight: bold;" for="cantidad">Cantidad</label>
                            <input type="number" id="cantidad" class="form-control" [(ngModel)]="detalle.cantidad"/>
                        </div>
                        <div class="form-outline mb-4">
                            <label class="form-label" style="font-weight: bold;" for="producto">Producto</label>
                            <select class="form-select" id="producto" [(ngModel)]="detalle.idProducto">
                                @for (item of productos; track item.id) {
                                    <option [value]="item.id">{{item.nombre}}</option>
                                } @empty {
                                    No hay productos
                                }
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block" (click)="guardar()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- TABLA -->
        <div class="bg-image h-50">
            <div class="mask d-flex align-items-center h-50">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-12">
                            <div class="card mt-3">
                                <div class="card-body p-0">
                                    <div class="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style="position: relative; height: 350px">
                                        <table class="table table-striped mb-0">
                                        <thead style="background-color: #002d72;">
                                            <tr>
                                                <th scope="col">ID Producto</th>
                                                <th scope="col">ID Turno</th>
                                                <th scope="col">Cantidad</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @for (item of detalles; track $index) {
                                                <tr>
                                                    <td>{{ item.idProducto }}</td>
                                                    <td>{{ item.idTurno }}</td>
                                                    <td>{{ item.cantidad }}</td>
                                                </tr>
                                            } @empty {
                                                <tr>
                                                    <td>
                                                        No hay productos
                                                    </td>
                                                </tr>
                                            }
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block w-25 mt-3" (click)="volver()">Volver</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrl: './turnos.component.css'
})
export class AgregarDetalleComponent {
    private detalleService = inject(DetalleTurnoService)
    private productoService = inject(ProductosService)
    private activatedRoute = inject(ActivatedRoute);
    id = this.activatedRoute.snapshot.params['idTurno'];
    detalle: TurnosDetalle = new TurnosDetalle()
    detalles: TurnosDetalle[] = [new TurnosDetalle()]
    productos: Productos[] = [new Productos()]

    constructor(private router: Router) {}

    ngOnInit() {
        this.detalle.idTurno = this.id
        this.productoService.getProductos().subscribe( (res) => {
            this.productos = res
        })
        this.recargarDetalles()
    }

    recargarDetalles(): void{
        this.detalleService.getDetalles().subscribe( (res) => {
            this.detalles = res.filter( item => item.idTurno === this.id)
        })
    }

    guardar(): void{
        this.detalleService.createDetalle(this.detalle).subscribe((res)=>{
            if(res){
                this.recargarDetalles()
            }
            else{
                console.log("no funca");
            }
        })
    }

    volver(): void {
        this.router.navigate(['/turnos'])
    }
}
