$('#favorito').val("no");

$(document).ready(function(){
    // --- Para realizar la petición al JSP de traer los contactos de la base de datos --- \\
    var datos = {
        operacion: 'cargar'
    };
    $.ajax({
        url: "operador.jsp",
        type: "post",
        data: datos,
        success: function (data) {
            var data = $.parseJSON(data);
            console.log(Object.keys(data.contacto).length); //Object.key optiene las claves del objeto JSON para que se puedan contar
            for (var i = 0; i < Object.keys(data.contacto).length; i++) {
                $('#plantilla').tmpl(data.contacto[i]).appendTo('#l_contactos');
            }
        }
    });
    
    //------------------------------------------------------------------------------\\
    
    // ------------------- para adecuar los valores de los radios y checkbox para guardarlos --------------------------
    $('.cc').click(function(){
        $('#tipo').val("cc");
    });

    $('.ti').click(function(){
        $('#tipo').val("ti");
    });

    $('#favorito').click(function(){
        if($('#favorito').val() == "si"){
            $('#favorito').val("no");
        }else{
            $('#favorito').val("si");
        }
    });
     //--------------------------------------------------------------------------------------------
    
    $('#enviar').click(function(){
        
        if($('#genero').val() == 'F') var genero = 'Femenino';
        else var genero = 'Masculino';
        
        if($('#tipo').val() == 'cc') var tipo = 'C.C';
        else var tipo = 'T.I';
        
        if($('#favorito').val() == 'si') var fav = 1;
        else var fav = 0;
        
        var datos = {
            operacion : 'guardar',
            nombre : $('#nombre').val(),
            apellido : $('#apellido').val(),
            genero : genero,
            identificacion : $('#identificacion').val(),
            tipo : tipo,
            telefono : $('#telefono').val(),
            direccion : $('#direccion').val(),
            correo : $('#correo').val(),
            favorito : fav
        };
        $.ajax({
            url: "./operador.jsp",
            type: "post",
            data: datos,
            success: function(data){
                var data = $.parseJSON(data);
                confirm('El contacto:'+ data.resultado + ' fue agregado');
            }
        });
        $('#plantilla').tmpl(datos).appendTo('#l_contactos');
    });
});


function desplegar(objeto){
    var contacto = $(objeto).parent().parent().find('.detalles');

    if(contacto.is(':visible')){
        contacto.hide(360);
    }else{
        contacto.show(360);
    }
}

// se devuele tres veces porque el boton esta en una fila, la fila esta en el div naranja y el div naranja esta en una fila 
function eliminar(objeto){
    var id = $(objeto).parent().parent().find('.detalles').children('#id').html();
    $(objeto).parent().parent().parent().remove();
    var datos = {
        operacion : 'eliminar',
        id: id
    };
    $.ajax({
        url: "./operador.jsp",
        type: "post",
        data: datos,
        success: function (data) {
            var data = $.parseJSON(data);
            confirm('el contaco con id: ',data.resultado, 'fue eliminado');
        }
    });
}

function arriba(objeto){
    var elemento = $(objeto).parent().parent().parent();
    var anterior = elemento.prev(elemento);
    $(objeto).parent().parent().parent().insertBefore(anterior)[0];
}

function abajo(objeto){
    var elemento = $(objeto).parent().parent().parent();
    var anterior = elemento.next();
    $(objeto).parent().parent().parent().insertAfter(anterior)[0];
}

/*
$('.encabezado').ready(function(){
    $('.detalles').hide(300);
});
*/

/* esta funcion no funciona porque jquery no escucha los elementos creados despues de cargar la pagina

$('.encabezado').click(function(){
    if($('.detalles').is(':visible')){
        $('.detalles').hide(360);
    }else{
        $('.detalles').show(360);
    }
    
});*/
