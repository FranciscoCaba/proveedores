import { Routes } from '@angular/router';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProductosComponent } from './productos/productos.component';
import { JaulasComponent } from './jaulas/jaulas.component';
import { AgregarProveedorComponent } from './proveedores/agregarProveedor.component';
import { EditarProveedorComponent } from './proveedores/editarProveedor.component';
import { AgregarProductoComponent } from './productos/agregarProducto.component';
import { AgregarJaulaComponent } from './jaulas/agregarJaula.component';
import { EditarProductoComponent } from './productos/editarProducto.component';
import { EditarJaulaComponent } from './jaulas/editarJaula.component';
import { TurnosComponent } from './turnos/turnos.component';
import { AgregarTurnoComponent } from './turnos/agregarTurno.component';
import { EditarTurnoComponent } from './turnos/editarTurno.component';
import { AgregarDetalleComponent } from './turnos/agregarDetalle.component';

export const routes: Routes = [
    {
        path: 'proveedores',
        component: ProveedoresComponent
    },
    {
        path:'proveedores/add',
        component: AgregarProveedorComponent
    },
    {
        path:'proveedores/edit/:idProveedor',
        component: EditarProveedorComponent
    },
    {
        path: 'productos',
        component: ProductosComponent
    },
    {
        path:'productos/add',
        component: AgregarProductoComponent
    },
    {
        path:'productos/edit/:idProducto',
        component: EditarProductoComponent
    },
    {
        path: 'jaulas',
        component: JaulasComponent
    },
    {
        path:'jaulas/add',
        component: AgregarJaulaComponent
    },
    {
        path:'jaulas/edit/:idJaula',
        component: EditarJaulaComponent
    },
    {
        path: 'turnos',
        component: TurnosComponent
    },
    {
        path:'turnos/add',
        component: AgregarTurnoComponent
    },
    {
        path:'turnos/edit/:idTurno',
        component: EditarTurnoComponent
    },
    {
        path:'detalle/add/:idTurno',
        component: AgregarDetalleComponent
    },
];
