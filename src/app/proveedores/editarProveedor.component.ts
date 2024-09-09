import { Component, inject } from '@angular/core';
import { ProveedoresService } from '../services/proveedores.service';
import { Proveedores } from '../models/proveedores.model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'editar-proveedores',
    standalone: true,
    imports: [FormsModule],
    template: `
        <div class="container mt-3">
            <div class="row justify-content-center">
                <div class="col-xl-5 col-md-8">
                    <div class="rounded shadow-5-strong p-5" style="background-color: lightgray;">
                        <h1 class="mb-4">Editar Proveedor</h1>
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
export class EditarProveedorComponent {
    private proveedorService = inject(ProveedoresService)
    private activatedRoute = inject(ActivatedRoute);
    id = this.activatedRoute.snapshot.params['idProveedor'];
    proveedor: Proveedores = new Proveedores()

    constructor(private router: Router) {}

    ngOnInit() {
        this.proveedorService.getProveedor(this.id).subscribe((res)=>{
            this.proveedor = res
        })
    }

    guardar(){
        this.proveedorService.editProveedor(this.proveedor).subscribe((res)=>{
            if(res){
                this.router.navigate(['/proveedores'])
            }
            else{
                console.log("no funca");
            }
        })
    }
}
