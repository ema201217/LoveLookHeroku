function global(element) {
  return document.querySelector(element);
}

window.addEventListener("load", function () {
  let formDel = global("#formDelete");
  formDel.addEventListener("submit", function (event) {
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "¿Estas seguro de eliminar el usuario? Esta acción es irreversible",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Usuario eliminado",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
          formDel.submit();
        }
      });
  });
});
