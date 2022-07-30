export class UserModel{
    constructor(
        public nombre: string,
        public apellido:string,
        public username: string,
        public password: string,
        public role: string
    ){
    }
}