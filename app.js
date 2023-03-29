require('colors');
//const { mostrarMenu, pausa } = require('./helpers/mensajes.');
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');

const Tareas = require('./models/tareas');


console.clear();
const main = async () => {
    console.log('Hello World'.blue);

    let opt = '';

    const tareas = new Tareas();
    do {
        opt = await inquirerMenu();
        //console.log({opt});

        switch (opt) {
            case '1':
                //crear opcion
                const desc = await leerInput('Descripción:');
                //console.log(desc);
                tareas.crearTarea(desc);
                break;
            case '2':
                console.log(tareas._listado);
                break;
        }


        //si la opcion es diferente de 0, se ejecuta el await
        if (opt !== '0') {
            await pausa();
        }
    } while (opt !== '0');
    //pausa();
}

main();