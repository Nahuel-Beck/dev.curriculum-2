// const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
// const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))




// Obtiene el formulario y el botón de envío
var formulario = document.getElementById('form-contacto');
var btnDisabled = document.getElementById('btn-form');

// Selecciona todos los elementos de entrada y textarea del formulario
var inputs = formulario.querySelectorAll('input, textarea');

// Función para verificar si todos los campos están llenos
function checkFields() {
  var allFilled = true;

  inputs.forEach(function(input) {
    // Verifica si el campo está vacío o tiene solo espacios
    if (input.value.trim() === '') {
      allFilled = false;
    }
  });

  // Habilita o deshabilita el botón basado en si todos los campos están llenos
  btnDisabled.disabled = !allFilled;
}

// Añade un evento de entrada a todos los elementos de entrada y textarea del formulario
inputs.forEach(function(input) {
  input.addEventListener('input', checkFields);
});


function recaptchaCallback(token) {
  console.log("reCAPTCHA completado con token:", token);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contacto");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    // Convertir FormData a formato URL-encoded
    const encodedData = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      encodedData.append(key, value);
    }

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodedData.toString(),
      });

      // Redirección manual
      window.location.href = "/exito-formulario.html";
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Hubo un problema al enviar el formulario. Intentá nuevamente.");
    }
  });
});