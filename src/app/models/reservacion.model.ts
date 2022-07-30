export class ReservacionModel{
    constructor(
        public fecha:Date,
        public usuario:string,
        public habitacion:string,
        public servicios:string
    ){

    }    
}