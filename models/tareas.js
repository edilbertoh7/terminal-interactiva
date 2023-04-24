

/**
 * _listado:
 * { 'uuid-123456-7890': { id:12, desc: 'Comprar pan', completadoEn: 1234567890 } }
 */

const colors = require('colors');
const { guardarDB } = require("../helpers/gestionarArchivo");
const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        //obtengo las llaves del objeto _listado
        Object.keys(this._listado).forEach(key => {
            //obtengo cada tarea por su id y la guardo en la variable tarea
            const tarea = this._listado[key];
            //console.log("tarea", tarea);
            //agrego cada tarea al array
            listado.push(tarea);
        });
        return listado;
    }


    constructor() {
        //inicializo el objeto _listado
        this._listado = {};
    }

    //26 metodo para eliminar una tarea
    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }
    //17 metodo para cargar tareas existentes en el archivo
    cargarTareasFromarray(tareas = []) {
        tareas.forEach(tarea => {
            //agrego al objeto cada tarea encontrada
            this._listado[tarea.id] = tarea
        })
    }

    //07 metodo para crear tarea
    crearTarea(desc = '') {
        //creo una instancia de la clase Tarea
        const tarea = new Tarea(desc);
        //agrego la tarea al objeto _listado
        this._listado[tarea.id] = tarea;
    }
    //10 metodo para listar tareas
    listadoCompleto(completada = null) {

        this.listadoArr.forEach((tarea, index) => {
            const totalTarea = `${colors.green(index + 1)}. ${tarea.desc} :: ${tarea.completadoEn ? tarea.completadoEn.green : 'pendiente'.red} `;
            if (completada === null) {
                //11 muestor todas las tareas
                console.log(totalTarea);
            } else if (completada === true && tarea.completadoEn) {
                //13 muestro las tareas completadas
                console.log(totalTarea)
            } else if ((completada === false) && (!tarea.completadoEn)) {
                //15 muestro las tareas pendientes
                console.log(totalTarea)
            }

        })
    }

    //metodo para cambiar el estado de la tarea
    toggleCompletadas(ids = []) {
        //marco como completadas las tareas que se encuentran en el array ids
        ids.forEach(id => {
            const tarea = this._listado[id];
            console.log("tarea", tarea);
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        })
        //marco como pendientes las tareas que no se encuentran en el array ids
        this.listadoArr.forEach(tarea => {

            console.log(!ids.includes(tarea.id));
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    


    }

}

module.exports = Tareas;