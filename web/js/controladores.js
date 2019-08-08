/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module("my-app", []);

app.controller("body",function($scope, $http){
    
    angular.element(document).ready(function(){
        
        var datos = {
            operacion: 'cargar'
        };
        $.ajax({
            url: "operador.jsp",
            type: "post",
            data: datos,
            success: function (data) {
                var data = $.parseJSON(data);
                console.log(data.contacto[0]); //Object.key optiene las claves del objeto JSON para que se puedan contar
                $scope.contactos = data.contacto;
                console.log($scope.contactos);
                $scope.$applyAsync();
            }
        });
    });
    
    $scope.nombre = "ffffffff";
    $scope.ocultar = true;
    $scope.contacto = {};
    //$scope.nuevoContacto = {};
    
    $scope.cargarDatos = function(){
        console.log($scope.contacto);
        if($scope.contacto.tipo == "ti") $scope.contacto.tipo = "T.I";
        else $scope.contacto.tipo = "C.C";
        
        if($scope.contacto.favorito == true) $scope.contacto.favorito = 1;
        else $scope.contacto.favorito = 0;
        
        if($scope.contacto.genero == 'F') $scope.contacto.genero = 'Femenino';
        else $scope.contacto.genero = 'Masculino';

        $scope.contacto.operacion = "guardar";
        var dato = $scope.contacto;
        
        
        
        $.ajax({
            type: 'post',
            url: './operador.jsp', 
            data: dato,
            success: function(data){
                var data = $.parseJSON(data);
                confirm('El contacto:'+ data.resultado + ' fue agregado');
                $scope.contactos.push($scope.contacto);
                $scope.$applyAsync();
            }
        });
    };
    
    $scope.eliminar = function(event, id){
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
                angular.element(event.target).parent().parent().parent().remove();
                confirm('el contaco con id: ',data.resultado, 'fue eliminado');
            }
        });
    };
    
    $scope.arriba = function(event){
        var elemento = angular.element(event.target).parent().parent().parent();
        var anterior = elemento.prev(elemento);
        angular.element(event.target).parent().parent().parent().insertBefore(anterior)[0];
    };
    
    $scope.abajo = function(event){
        var elemento = angular.element(event.target).parent().parent().parent();
        var anterior = elemento.next();
        angular.element(event.target).parent().parent().parent().insertAfter(anterior)[0];
    };
    
    $scope.desplegar = function(event){
        var contacto = angular.element(event.target).parent().parent().find('.detalles');

        if(contacto.is(':visible')){
            contacto.hide(360);
        }else{
            contacto.show(360);
        }
    }
});