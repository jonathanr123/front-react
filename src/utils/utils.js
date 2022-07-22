import Swal from "sweetalert2";

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

  // Notificaciones
  notificacionGuardar () {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Se ha guardado con éxito'
      })
  }

  notificacionEliminar (info, id, funcion) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success margenbutton',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Estas seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si!',
            cancelButtonText: 'No',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                funcion(info, id)
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                'Se ha eliminado el registro',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'No se eliminaron registros',
                'error'
              )
            }
          })
    }
}

export default new Utils();
