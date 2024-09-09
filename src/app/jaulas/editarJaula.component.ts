import { Component, inject } from '@angular/core';
import { JaulasService } from '../services/jaulas.service';
import { Jaulas } from '../models/jaulas.model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'editar-jaulas',
    standalone: true,
    imports: [FormsModule],
    template: `
        <div class="container mt-3">
            <div class="row justify-content-center">
                <div class="col-xl-5 col-md-8">
                    <div class="rounded shadow-5-strong p-5" style="background-color: lightgray;">
                        <h1 class="mb-4">Editar Jaula</h1>
                        <div class="form-outline mb-4">
                            <label class="form-label" style="font-weight: bold;" for="nombre">Nombre</label>
                            <input type="text" id="nombre" class="form-control" [(ngModel)]="jaula.nombre"/>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block" (click)="guardar()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: ``
})
export class EditarJaulaComponent {
    private jaulaservice = inject(JaulasService)
    private activatedRoute = inject(ActivatedRoute);
    id = this.activatedRoute.snapshot.params['idJaula'];
    jaula: Jaulas = new Jaulas()

    constructor(private router: Router) {}

    ngOnInit() {
        this.jaulaservice.getJaula(this.id).subscribe((res)=>{
            this.jaula = res
        })
    }

    guardar(){
        this.jaulaservice.editJaula(this.jaula).subscribe((res)=>{
            if(res){
                this.router.navigate(['/jaulas'])
            }
            else{
                console.log("no funca");
            }
        })
    }
}
