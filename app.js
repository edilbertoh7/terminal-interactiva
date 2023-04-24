require('colors');
const { guardarDB, leerDB } = require('./helpers/gestionarArchivo');
//const { mostrarMenu, pausa } = require('./helpers/mensajes.');
const { inquirerMenu, pausa, leerInput, listadoTareasToDelete, confirmarEliminacion, listadoChekList } = require('./helpers/inquirer');

const Tareas = require('./models/tareas');


console.clear();
const main = async () => {
    console.log('Hello World'.blue);

    let opt = '';

    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {// cargar tareas
        //16 cargo las tareas existentes en el archivo
        tareas.cargarTareasFromarray(tareasDB)
    }

    do {
        //01 imprimir el menu
        opt = await inquirerMenu();
        //console.log({opt});

        switch (opt) {
            case '1':
                //04 obtengo la descripcion de la tarea desde el input
                const desc = await leerInput('Descripción:');
                console.log("leerInput = ", desc);
                //console.log(desc);
                //06 crear tarea
                tareas.crearTarea(desc);
                break;
            case '2':
                //console.log(tareas.listadoArr);
                //09 muestro las tareas
                tareas.listadoCompleto()

                break;
            case '3':
                //12 muestro las tareas completadas
                tareas.listadoCompleto(true)
                break

            case '4':
                //14 muestro las tareas pendientes
                tareas.listadoCompleto(false)
                break

            case '5': // checkear tareas
                const ids = await listadoChekList(tareas.listadoArr)
               tareas.toggleCompletadas(ids)
                console.log("ids = ", ids);

                break

            case '6':

                //18 recibo el id de la tarea a borrar
                const id = await listadoTareasToDelete(tareas.listadoArr);
                if (id !== '0') { //22 si el valor es 0 se cancela el borrado               
                    const confirm = await confirmarEliminacion('esta seguro que desea eliminar la tarea?');
                    if (confirm) {//24 si el valor de la confirmacion es true elimino la tarea
                        tareas.borrarTarea(id)//25 metodo para elimnar la tarea
                        console.log('');
                        console.log('tarea borrada');
                    }
                }

                break
        }
        //8 hago que se guarde en el archivo
        guardarDB(tareas.listadoArr);


        //si la opcion es diferente de 0, se ejecuta el await
        if (opt !== '0') {
            await pausa();
        }
    } while (opt !== '0');
    //pausa();
}

main();