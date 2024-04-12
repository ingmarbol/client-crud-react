import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

//Para uso del Sweet Alert
import Swal from 'sweetalert2'




function App() {

  //Constantes para gestionar los estados de los campos
  const [nombre, setNombre] = useState("")
  const [edad, setEdad] = useState()
  const [pais, setPais] = useState("")
  const [cargo, setCargo] = useState("")
  const [anios, setAnios] = useState()
  const [id, setId] = useState()

  const [editar, setEditar] = useState(false)

  //Creamos la lista de empleados
  const [empleadosList, setEmpleados] = useState([])

  ////////////////////////////////////////////////////////////////////////////////////////////////
  //Función para realizar la inserción
  const add = ()=>{
    //Realizamos la petición de inserción de datos al back, por medio de Axios
    
    //Especificamos la ruta y el cuerpo del mensaje para llamar
    //al método de inserción de datos
    Axios.post("http://localhost:3001/create", {
      nombre:nombre,
      edad:edad,
      pais:pais, 
      cargo:cargo,
      anios:anios
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      //Usamos Sweet Alert
      Swal.fire({
        title: "<strong>Registro Exitoso!!!</strong>",
        html: "<i> El empleado <strong>"+ nombre + " </strong> fue registrado con Éxito</i>",
        icon: 'success',
        timer: 2000
      })
    })    
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  //Función para actualizar los datos
  const update = ()=>{
    //Realizamos la petición de inserción de datos al back, por medio de Axios
    
    //Especificamos la ruta y el cuerpo del mensaje para llamar
    //al método de inserción de datos
    Axios.put("http://localhost:3001/update", {
      nombre:nombre,
      id:id,
      edad:edad,
      pais:pais, 
      cargo:cargo,
      anios:anios
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualización exitosa!!!</strong>",
        html: "<i> El empleado <strong>"+ nombre + " </strong> fue actualizado con Éxito</i>",
        icon: 'success',
        timer: 2000
      })
    })    
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  //Función para realizar la Cancelación
  const limpiarCampos =() =>{
    setAnios("");
    setNombre("")
    setCargo("")
    setEdad("")
    setPais("")
    setId("")
    setEditar(false)

  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  //Función para realizar la Edición
  const editarEmpleado = (val) =>{
    setEditar(true);

    //Capturamos los valores para setearlos en cada campo
    setNombre(val.nombre)
    setEdad(val.edad)
    setPais(val.pais)
    setCargo(val.cargo)
    setAnios(val.anios)
    setId(val.id)
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  //Función para realizar la visualización de datos
  const getEmpleados = ()=>{
    //Realizamos la petición de datos al back, por medio de Axios
    
    //Especificamos la ruta y el cuerpo del mensaje para llamar
    //al método de inserción de datos
    Axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data)
    })    
  }

  //getEmpleados();  //Esta función así nomás daba problema porque se estaba ejecutando infinitamente
                     //Cambié por lo siguiente y se corrigió:
  useEffect(() => {
    getEmpleados();
  }, [])

  ////////////////////////////////////////////////////////////////////////////////////////////////
  //Función para eliminar los datos
  const deleteEmple = (val)=>{
    //Añadimos el mensaje para preguntar al usuario si realmente
    //desea eliminar el registro
    Swal.fire({
      title: 'Confirmar eliminado?',
      html: "<i> Realmente desea eliminar a <strong>" + val.nombre + " </strong>?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, deseo eliminar!!!'
    }).then((result) =>{
      if (result.isConfirmed){
        //En caso de que sí desea eliminar el registro se ejecuta este código con Axios
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(()=>{
          getEmpleados();
          limpiarCampos();   
        })
        //////Otro mensaje indicando que se realizó la eliminación  
        Swal.fire(
          'Eliminado!',
          val.nombre + ' fue Eliminado!!!'
        )
      }
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se logró eliminar al empleado!!!',
        footer: error
      })
    });
      
  }
  
  return (
    <div className="container">
      <div className="App">

        <div className='lista'>
          {/* Para visualizar la información voy a crear una tabla
          Es decir vamos a extraer los valores que vienen desde mi API
          Para esto voy a llamar a la lista de Empleados y voy a usar 
          el map para recorrer todos los elementos.*/}

          
        </div>  

      </div>
      <div className="card text-center">
        <div className="card-header">
          <h1>GESTIÓN DE EMPLEADOS</h1>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text"
              onChange={(event) =>{
              setNombre(event.target.value)
              }} className="form-control" value={nombre} placeholder="Ingrese Nombre de Usuario" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input type="number"
              onChange={(event) =>{
              setEdad(event.target.value)
              }} className="form-control" value={edad} placeholder="Ingrese la Edad" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">País:</span>
            <input type="text"
              onChange={(event) =>{
              setPais(event.target.value)
              }} className="form-control" value={pais} placeholder="Ingrese el nombre de País" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <input type="text"
              onChange={(event) =>{
              setCargo(event.target.value)
              }} className="form-control" value={cargo} placeholder="Ingrese su cargo" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años:</span>
            <input type="number"
              onChange={(event) =>{
              setAnios(event.target.value)
              }} className="form-control" value={anios} placeholder="Ingrese los Años de Experiencia" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>        
              
          
        </div>

        <div className="card-footer text-muted">
          {
            editar? 
            <div>
              <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
              <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
            </div>
            
            : <button className='btn btn-success' onClick={add}>Registrar</button>
          }
          
        </div>

        <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Edad</th>
                <th scope="col">País</th>
                <th scope="col">Cargo</th>
                <th scope="col">Experiencia</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
            {
              empleadosList.map((val, key) =>{
                return <tr key={val.id}>
                        <th>{val.id}</th>
                        <td>{val.nombre}</td>
                        <td>{val.edad}</td>
                        <td>{val.pais}</td>
                        <td>{val.cargo}</td>
                        <td>{val.anios}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button"
                          onClick={()=>{
                            editarEmpleado(val)
                          }}                          
                          className="btn btn-info">Editar</button>

                          <button type="button"
                          onClick={()=>{
                            deleteEmple(val);
                          }}
                          className="btn btn-danger">Eliminar</button>
                        </div>
                        </td>
                       </tr>                     
              })
            }       

            </tbody>
          </table>      

      </div>

    </div>

  );
}

export default App;


