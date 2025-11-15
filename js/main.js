//Ruta base de la API
const API = 'https://dog.ceo/api';

//Función para mostrar un toast
function mostrarToast(texto, error=false) {
    $("#toast")
        .removeClass()      //Elimina la clase que tenga
        .addClass(error ? "toast-error" : "toast-success") //Establece la clase de error
        .text(texto)        //Establece el texto
        .fadeIn(400)        //Tiempo de entrada
        .delay(3000)        //Tiempo que se mantiene mostrándose
        .fadeOut(400);      //Tiempo de salida
}

//Función para cargar imágenes aleatorias dada una ruta y un contenedor
function loadRandomImages(ruta, $container){
    //Vacía el contenedor
    $container.empty();

    //Realiza la solicitud
    $.ajax({
        url: ruta,
        type: "GET",
        dataType: "json",
        success: function(data){
            //Si el resultado es de éxito
            if(data.status == "success"){
                //Para cada imagen de las existentes
                for(let url of data.message){
                    //Añade al contenedor la imagen
                    $container.append(`<img class="random-image" src="${url}">`);
                }            
            } else {
                //Mensaje de error
                mostrarToast("Las imágenes no se han podido cargar", "toast-error");
            }
        },
        error: function(xhr, status, error){
            //Mensaje de error
            mostrarToast("Las imágenes no se han podido cargar", "toast-error");
        }
    });
}