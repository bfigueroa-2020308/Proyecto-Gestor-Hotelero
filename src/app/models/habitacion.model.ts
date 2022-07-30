export class HabitacionModel{
    constructor(
        public numero:number,
        public descripcion: string,
        public precio :number,
        public reservada: boolean,
        public ocupada: boolean,
        public hotel: string,
        public user: string
    ){

    }
}