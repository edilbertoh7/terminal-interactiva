

/**
 * _listado:
 * { 'uuid-123456-7890': { id:12, desc: 'Comprar pan', completadoEn: 1234567890 } }
 */

const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    constructor() {
        this._listado = {};
    }

    //metodo para crear tarea
    crearTarea( desc = '' ) {
        const meme = new Tarea(desc);
        this._listado[meme.id] = meme;
    }
    
}

module.exports = Tareas;