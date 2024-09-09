import { Component, inject } from '@angular/core';
import { TurnosService } from '../services/turnos.service';
import { Turnos } from '../models/turnos.model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from '../services/proveedores.service';
import { Proveedores } from '../models/proveedores.model';

@Component({
    selector: 'editar-turnos',
    standalone: true,
    imports: [FormsModule],
    template: `
        <div class="container mt-3">
            <div class="row justify-content-center">
                <div class="col-xl-5 col-md-8">
                    <div class="rounded shadow-5-strong p-5" style="background-color: lightgray;">
                        <h1 class="mb-4">Editar Turno</h1>
                        <div class="form-outline mb-4">
                            <label class="form-label" style="font-weight: bold;" for="fecha">Fecha</label>
                            <input type="date" id="fecha" class="form-control" [(ngModel)]="turno.fecha"/>
                        </div>
                        <div class="form-outline mb-4">
                            <label class="form-label" style="font-weight: bold;" for="hora-inicio">Hora inicio</label>
                            <select class="form-select" id="hora-inicio" [(ngModel)]="turno.horaInicioAgendamiento">
                                @for (item of horas; track item) {
                                    <option [value]="item">{{item}}</option>
                                }
                            </select>
                        </div>
                        <div class="form-outline mb-4">
                            <label class="form-label" style="font-weight: bold;" for="hora-fin">Hora fin</label>
                            <select class="form-select" id="hora-fin" [(ngModel)]="turno.horaFinAgendamiento">
                                @for (item of horas; track item) {
                                    <option [value]="item">{{item}}</option>
                                }
                            </select>
                        </div>
                        <div class="form-outline mb-4">
                            <label class="form-label" style="font-weight: bold;" for="proveedor">Proveedor</label>
                            <select class="form-select" id="proveedor" [(ngModel)]="turno.idProveedor">
                                @for (item of proveedores; track item) {
                                    <option [value]="item.id">{{item.nombre}}</option>
                                } @empty {
                                    No hay proveedores
                                }
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block" (click)="guardar()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: ``
})
export class EditarTurnoComponent {
    private turnoService = inject(TurnosService)
    private proveedorService = inject(ProveedoresService)
    private activatedRoute = inject(ActivatedRoute);
    id = this.activatedRoute.snapshot.params['idTurno'];
    turno: Turnos = new Turnos()
    horas: string[] = ['7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00']
    proveedores: Proveedores[] = [new Proveedores()]

    constructor(private router: Router) {}

    ngOnInit() {
        this.turnoService.getTurno(this.id).subscribe((res)=>{
            this.turno = res
        })
        this.proveedorService.getProveedores().subscribe( (res) => {
            this.proveedores = res
        })
    }

    guardar(){
        this.turnoService.editTurno(this.turno).subscribe((res)=>{
            if(res){
                this.router.navigate(['/turnos'])
            }
            else{
                console.log("no funca");
            }
        })
    }
}
