<%-- 
    Document   : operador
    Created on : 21/06/2019, 08:48:35 AM
    Author     : oscar-corzo
--%>

<%@page import="com.google.gson.Gson"%>
<%@page import="beans.Contacto1"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>

<%
    String respuesta = "";
    String operacion = request.getParameter("operacion");
    if(operacion.equals("guardar")){
        Contacto1 contacto = new Contacto1();

        String nombre = request.getParameter("nombre");

        //contacto.setNombre(nombre);

        contacto.setNombre(request.getParameter("nombre"));
        contacto.setApellido(request.getParameter("apellido"));
        contacto.setGenero(request.getParameter("genero"));
        contacto.setIdentificacion(request.getParameter("identificacion"));
        contacto.setTipoIdentificacion(request.getParameter("tipo"));
        contacto.setTelefono(request.getParameter("telefono"));
        contacto.setDireccion(request.getParameter("direccion"));
        contacto.setCorreo(request.getParameter("correo"));
        contacto.setFavorito(request.getParameter("favorito"));

        contacto.guardarContacto();
        respuesta = "{\"resultado\": \" "+nombre+" \"}";
    }else{
        if(operacion.equals("eliminar")){
        
        Contacto1 contacto = new Contacto1();
        String id = request.getParameter("id");
        contacto.borrarContacto(id);
        respuesta = "{\"resultado\": \" "+id+" \"}";
        }else{
            Contacto1 contacto = new Contacto1();
            List<Contacto1> lista = new ArrayList<>();
            lista = contacto.listarContactos();
            respuesta = "{\"contacto\":"+ new Gson().toJson(lista) +"";
            //for(int i=1; i<lista.size(); i+=1){
                //respuesta += ", contacto"+i+": "+lista.get(i);
            //}
            respuesta += "}";
        }
    }
    
    //response.setContentType("application/json;charset=iso-8859-1");
    out.print(respuesta);
    
%>
