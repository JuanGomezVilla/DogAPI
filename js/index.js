//Obtiene el contenedor con las imágenes
let carousel = $("#carousel");

//Se lo pasa directamente a la función para cargar imágenes con el contenedor
loadRandomImages(`${API}/breeds/image/random/5`, carousel);