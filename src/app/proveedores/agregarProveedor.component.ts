import { Component, inject } from '@angular/core';
import { ProveedoresService } from '../services/proveedores.service';
import { Proveedores } from '../models/proveedores.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'agregar-proveedores',
    standalone: true,
    imports: [FormsModule],
    template: `
        <div class="container mt-3">
            <div class="row justify-content-center">
                <div class="col-xl-5 col-md-8">
                    <div class="rounded shadow-5-strong p-5" style="background-color: lightgray;">
                        <h1 class="mb-4">Crear Proveedor</h1>
                        <div class="form-outline mb-4">
                            <label class="form-label" style="font-weight: bold;" for="nombre">Nombre</label>
                            <input type="text" id="nombre" class="form-control" [(ngModel)]="proveedor.nombre"/>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block" (click)="guardar()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: ``
})
export class AgregarProveedorComponent {
    private proveedorService = inject(ProveedoresService)
    proveedor: Proveedores = new Proveedores()

    constructor(private router: Router) {}

    ngOnInit() {
        this.proveedorService.getProveedores().subscribe((res)=>{
            let aux = 0;
            for (const element of res) {
                if (Number(element.id) > aux) {
                    aux = Number(element.id)
                }
            }
            this.proveedor.id = String(aux + 1)
        })
    }

    guardar(){
        this.proveedorService.createProveedor(this.proveedor).subscribe((res)=>{
            if(res){
                this.router.navigate(['/proveedores'])
            }
            else{
                console.log("no funca");
            }
        })
    }
}
