class Utils {
    
    convertirFormatoFecha(string){
        var info = string.split('-');
        return info[2] + '/' + info[1] + '/' + info[0];
    }

    convertirFormatoHora(string){
        var info = string.split(':');
        return info[0] + ':' + info[1];
    }

    convertirEstado(estado){
        if( estado === 1 ){
            return 'Vigente';
        } else{
            return 'Caducado';
        }
    }

    convertirTipo(tipo){
        if( tipo === 1 ){
            return 'Publica';
        } else{
            return 'Privada';
        }
    }
}

export default new Utils();