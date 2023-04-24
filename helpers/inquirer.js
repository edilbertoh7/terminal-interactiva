require('colors');
const inquirer = require('inquirer');
const Tareas = require('../models/tareas');


//02 menu de preguntas
const preguntas = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]
    }
]

const inquirerMenu = async () => {
    console.clear();
    console.log('=========================='.green);
    console.log('  Seleccione una opción'.green);
    console.log('==========================\n'.green);

    //03 ejectuamos el prompt y retornamos la opcion
    const { option } = await inquirer.prompt(preguntas);
    return option;

}

const tecla = [
    {
        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.green} para continuar`,
    }
];

const pausa = async () => {
    console.log('\n');
    const { option } = await inquirer.prompt(tecla);
    return option;
}

//05 input para la descripcion de la tarea
const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    //hago destructuring para obtener solo la descripcion
    //ejecutamos el prompt y retornamos la descripcion
    const { desc } = await inquirer.prompt(question);
    return desc;
}
//19 muestro el listado de tareas que se podrian borrar
const listadoTareasToDelete = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        idx = `${i + 1}.`.green
        return {
            value: tarea.id,//id de la tarea
            name: `${idx} ${tarea.desc}`//descripcion de la tarea
        }
    });
    //21 agrego la opcion 0 al inicion para poder cancelar si ya no desea borrar la tarea
    choices.unshift({
        value: '0',
        name: '0.'.green + 'cancelar'
    })
    //20 retornara el id de la tarea que se va a borrar
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];
    // retorno el id
    const { id } = await inquirer.prompt(preguntas);

    return id;

}
//23 se hace la confirmacion de la eliminacion de la tarea
confirmarEliminacion = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question)
    return ok

}

const listadoChekList = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        //console.log( tarea.completadoEn);
        idx = `${i + 1}.`.green
        return {
            value: tarea.id,//id de la tarea
            name: `${idx} ${tarea.desc}`,//descripcion de la tarea
            checked: tarea.completadoEn ? true : false
        }
    });
    //agrego la opcion 0 al inicion para poder cancelar si ya no desea borrar la tarea
   
    //retornara el id de la tarea que se va a borrar
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];
    // retorno el id
    const { ids } = await inquirer.prompt(pregunta);

    return ids;

}



module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasToDelete,
    confirmarEliminacion,
    listadoChekList

}