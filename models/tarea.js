const { v4: uuidv4 } = require('uuid');//identificador unico
class Tarea {
    id = '';
    desc = '';
    completadoEn = null;

    constructor( desc ) {//inicializo todas las propiedades
         this.id = uuidv4();
        this.desc = desc;
       // this.id = new Date().getTime();
       this.completadoEn = null;
    }

}
module.exports = Tarea;