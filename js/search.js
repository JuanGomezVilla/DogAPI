//Cuando todos los elementos del DOM se carguen
$(document).ready(() => {
    //Obtener los elementos
    let $selectDogBreed      = $("#selectDogBreed"),
        $selectDogSubBreed   = $("#selectDogSubBreed"),
        $inputAmountImages   = $("#inputAmountImages"),
        $formDogs            = $("#formDogs");

    //Obtener la lista de razas
    $.ajax({
        url: `${API}/breeds/list/all`,
        type: "GET",
        dataType: "json",
        success: function(data){
            //Si sucede con éxito
            if(data.status == "success"){
                //Obtiene las claves como razas y las inserta en el contenedor
                Object.keys(data.message).forEach(breed => {
                    $selectDogBreed.append(`<option value="${breed}">${breed}</option>`);
                });
            } else {
                //Mensaje de error
                mostrarToast("Las opciones no se han podido cargar", "toast-error");
            }
        },
        error: function(xhr, status, error){
            //Mensaje de error
            mostrarToast("Las opciones no se han podido cargar", "toast-error");
        }
    });

    //Cuando el selector de razas cambie
    $selectDogBreed.on("change", function(){
        //Deshabilita temporalmente ambos select
        $selectDogBreed.prop("disabled", true);
        $selectDogSubBreed.prop("disabled", true);

        //Se obtiene la lista de subrazas
        $.ajax({
            url: `${API}/breed/${$(this).val()}/list`,
            type: "GET",
            dataType: "json",
            success: function(data){
                //Si se produce éxito
                if(data.status == "success"){
                    //Vacía el select de subrazas
                    $selectDogSubBreed.empty();

                    //Obtiene del mensaje las subrazas
                    data.message.forEach(subBreed => {
                        $selectDogSubBreed.append(`<option value="${subBreed}">${subBreed}</option>`);
                    });

                    //Habilita por siempre el select de razas
                    $selectDogBreed.prop("disabled", false);

                    //Habilita el select de subrazas si hay opciones
                    if(data.message.length != 0) $selectDogSubBreed.prop("disabled", false);
                } else {
                    //Mensaje de error
                    mostrarToast("Las opciones no se han podido cargar", true);
                }
            },
            error: function(xhr, status, error){
                //Mensaje de error
                mostrarToast("Las opciones no se han podido cargar", true);
            }
        });
    });

    //Cuando el formulario se haga submit
    $formDogs.on("submit", function(event){
        //Previene el envío por defecto
        event.preventDefault();
        
        //Capturar la raza y subraza
        let raza     = $selectDogBreed.val(),
            subraza  = $selectDogSubBreed.val(),
            cantidad = $inputAmountImages.val();
        
        //Carga las imágenes capturadas
        loadRandomImages(
            subraza ? `${API}/breed/${raza}/${subraza}/images/random/${cantidad}` : `${API}/breed/${raza}/images/random/${cantidad}`,
            $(".carousel")
        );

    })
});
