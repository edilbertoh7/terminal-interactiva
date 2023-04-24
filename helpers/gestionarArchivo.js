const fs = require('fs')

const archivo = './db/data.json';//ruta del archivo

const guardarDB = (data) => {
    
     fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = () => {
    //si el archivo no existe, retorno null
    if (!fs.existsSync(archivo)) {
        return null;
    }
    //si el archivo existe, lo leo y lo retorno
    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = JSON.parse(info);//convierto el string en un objeto
    return data;
}
module.exports = {
    guardarDB,
    leerDB
}