/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Sammy Guergachi <sguergachi at gmail.com>
 */
public class Contacto1 {

    private String identificacion;
    private String nombre;
    private String apellido;
    private String genero;
    private String tipoIdentificacion;
    private String telefono;
    private String direccion;
    private String correo;
    private String favorito;

    public Contacto1() {
    }

    public Contacto1 getContacto(String identificacion) throws SQLException {
        this.identificacion = identificacion;
        return this.getContacto();
    }

    public String getIdentificacion() {
        return identificacion;
    }

    public void setIdentificacion(String identificacion) {
        this.identificacion = identificacion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getTipoIdentificacion() {
        return tipoIdentificacion;
    }

    public void setTipoIdentificacion(String tipoIdentificacion) {
        this.tipoIdentificacion = tipoIdentificacion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getFavorito() {
        return favorito;
    }

    public void setFavorito(String favorito) {
        this.favorito = favorito;
    }

    public boolean guardarContacto() {
        ConexionBD conexion = new ConexionBD();
        String sentencia = "INSERT INTO contacto(identificacion,nombre,apellido, genero, tipo, telefono, direccion, correo, favorito)"
                +" VALUES (\""+ this.identificacion +"\", \""+ this.nombre +"\", \""+ this.apellido +"\", \""+ this.genero +"\", \""+ this.tipoIdentificacion +"\", \""+ this.telefono +"\", \""+ this.direccion +"\",\""+ this.correo +"\","+ this.favorito +");  ";
        if (conexion.setAutoCommitBD(false)) {
            if (conexion.insertarBD(sentencia)) {
                conexion.commitBD();
                conexion.cerrarConexion();
                return true;
            } else {
                conexion.rollbackBD();
                conexion.cerrarConexion();
                return false;
            }
        } else {
            conexion.cerrarConexion();
            return false;
        }
    }

    public boolean borrarContacto(String id) {
        String Sentencia = "DELETE FROM contacto WHERE identificacion='" + id + "'";
        ConexionBD conexion = new ConexionBD();
        if (conexion.setAutoCommitBD(false)) {
            if (conexion.actualizarBD(Sentencia)) {
                conexion.commitBD();
                conexion.cerrarConexion();
                return true;
            } else {
                conexion.rollbackBD();
                conexion.cerrarConexion();
                return false;
            }
        } else {
            conexion.cerrarConexion();
            return false;
        }
    }

    public boolean actualizarContacto() {
        ConexionBD conexion = new ConexionBD();
        String Sentencia = "UPDATE `NombreTabla` SET columna1='valaColumna1',columana2='valColumna2',..."+
                " WHERE id=" + this.identificacion + ";";
        if (conexion.setAutoCommitBD(false)) {
            if (conexion.actualizarBD(Sentencia)) {
                conexion.commitBD();
                conexion.cerrarConexion();
                return true;
            } else {
                conexion.rollbackBD();
                conexion.cerrarConexion();
                return false;
            }
        } else {
            conexion.cerrarConexion();
            return false;
        }
    }

    public List<Contacto1> listarContactos() throws SQLException {
        ConexionBD conexion = new ConexionBD();
        List<Contacto1> listaContactos = new ArrayList<>();
        String sql = "select * from contacto";
        ResultSet rs = conexion.consultarBD(sql);
        Contacto1 c;
        while (rs.next()) {
            c = new Contacto1();
            c.setIdentificacion(rs.getString("identificacion"));
            c.setNombre(rs.getString("nombre"));
            c.setApellido(rs.getString("apellido"));
            c.setGenero(rs.getString("genero"));
            c.setCorreo(rs.getString("correo"));
            c.setFavorito(rs.getString("favorito"));
            c.setTipoIdentificacion(rs.getString("tipo"));
            c.setDireccion(rs.getString("direccion"));
            c.setTelefono(rs.getString("telefono"));
            listaContactos.add(c);

        }
        conexion.cerrarConexion();
        return listaContactos;
    }

    public Contacto1 getContacto() throws SQLException {
        ConexionBD conexion = new ConexionBD();
        String sql = "select * from Contactos where identificacion='" + this.identificacion + "'";
        ResultSet rs = conexion.consultarBD(sql);
        if (rs.next()) {
            this.identificacion = rs.getString("identificacion");
            this.nombre = rs.getString("nombre");
            this.apellido = rs.getString("apellido");
            this.genero = rs.getString("genero");
            this.tipoIdentificacion = rs.getString("tipo");
            this.telefono = rs.getString("telefono");
            this.direccion = rs.getString("direccion");
            this.correo = rs.getString("correo");
            this.favorito = rs.getString("favorito");
            conexion.cerrarConexion();
            return this;

        } else {
            conexion.cerrarConexion();
            return null;
        }

    }

}
