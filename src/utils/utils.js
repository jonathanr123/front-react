class Utils {
  convertirFormatoFecha(string) {
    var info = string.split("-");
    return info[2] + "/" + info[1] + "/" + info[0];
  }

  convertirFormatoHora(string) {
    var info = string.split(":");
    return info[0] + ":" + info[1];
  }

  convertirEstado(estado) {
    if (estado === 1) {
      return "Vigente";
    } else {
      return "Caducado";
    }
  }

  convertirTipo(tipo) {
    if (tipo === 1) {
      return "Publica";
    } else {
      return "Privada";
    }
  }

  convertirCheck(opcion) {
    if (opcion === false) {
      return "0";
    } else {
      return "1";
    }
  }

  convertirEstatal(opcion) {
    if (opcion === "0") {
      return false;
    } else {
      return true;
    }
  }

  convertRole(role) {
    if (role === true) {
      return "Administrador";
    } else {
      return "Usuario";
    }
  }

  convertStateUser(state) {
    if (state === true) {
      return "Activo";
    } else {
      return "Inactivo";
    }
  }

  // Funcion que retorna la descripcion segun el estado de evolucion
  describirEstado(estado) {
    switch (estado) {
      case 0:
        return "Ausencia de signos patológicos.";
      case 1:
        return "Los síntomas parkinsonianos afectan sólo a un lado del cuerpo.";
      case 2:
        return "Afectación de los dos lados del cuerpo sin transtorno del equilibrio.";
      case 3:
        return "Alteración bilateral leve o moderada, con cierta inestabilidad postural. El paciente es fisicamente independiente.";
      case 4:
        return "Incapacidad grave: es capaz de caminar o de permanecer de pié sin ayuda.";
      case 5:
        return "El paciente necesita ayuda para todo. Permanece en cama o sentado.";
      default:
        return "";
    }
  }
}

export default new Utils();
