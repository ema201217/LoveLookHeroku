function gl(element) {
  return document.querySelectorAll(element);
}

window.addEventListener("DOMContentLoaded", function () {
  if (location.pathname == "/admin/users") {
    let formAdminUser = gl("#formDeleteUser");

    for (let i = 0; i < formAdminUser.length; i++) {
      formAdminUser[i].addEventListener("submit", function (event) {
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
            title: "¿Estas seguro que deseas eliminar?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire({
                title: "El usuario se eliminó",
                icon: "success",
                timer: 1000,
                showConfirmButton: false,
              });
              formAdminUser[i].submit();
            }
          });
      });
    }
  }
});
