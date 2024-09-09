export class Turnos {
    id: string
    fecha: string
    horaInicioAgendamiento: string
    horaFinAgendamiento: string
    idProveedor: string
    idJaula: string
    horaInicioRecepcion: string
    horaFinRecepcion: string

    constructor() {
        this.id = "1"
        this.fecha = ''
        this.horaInicioAgendamiento = '7:00'
        this.horaFinAgendamiento = '7:30'
        this.idProveedor = '1'
        this.idJaula = ''
        this.horaInicioRecepcion = ''
        this.horaFinRecepcion = ''
    }
}