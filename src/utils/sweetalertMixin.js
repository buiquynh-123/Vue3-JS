import Swal from "sweetalert2";

export const showAlert = (title, text, icon, confirmButton) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: confirmButton,
  });
};
