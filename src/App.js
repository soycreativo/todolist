
import React from 'react';
import './bootstrap-5.1.3-dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import './index.css';
import Buscador from './componentes/Buscador';




const data = [
  { id: 1, Personaje: "Naruto", Anime: "Naruto" },
  { id: 2, Personaje: "Goku", Anime: "Dragon Ball" },
  { id: 3, Personaje: "Kenshin Himura", Anime: "Rurouni Kenshin" },
  { id: 4, Personaje: "Monkey D. Luffy", Anime: "One Piece" },
  { id: 5, Personaje: "Edward Elric", Anime: "FullMetal Alchemist: Brotherhood" },
  { id: 6, Personaje: "Seto Kaiba", Anime: "Yu-Gi-Oh!" },
];


class App extends React.Component {

  render(){
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>
  
          <Buscador 
          
          datosBusqueda={this.datosBusqueda}
          />
        </div>
      </div>
    );
  } 



  
  state = {
    data: data,
    form:{
      id:'',
      Personaje:'',
      Anime:''

    },
    modalInsertar: false,
    modalEditar: false,
  };

  handleChange=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }

  mostrarModalInsertar=()=>{
    this.setState({modalInsertar: true});
  }

  ocultarModalInsertar=()=>{
    this.setState({modalInsertar: false});
  }

  mostrarModalEditar=(registro)=>{
    this.setState({modalEditar: true, form: registro});
  }

  ocultarModalEditar=()=>{
    this.setState({modalEditar: false});
  }

  insertar=()=>{
    var valorNuevo={...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista=this.state.data;
    lista.push(valorNuevo);
    this.setState({data: lista, modalInsertar: false});
  }

  editar=(dato)=>{
    var contador=0;
    var lista=this.state.data;
    lista.map((registro)=>{
      if(dato.id==registro.id){
        lista[contador].Personaje=dato.Personaje;
        lista[contador].Anime=dato.Anime;
      }
      contador++;
    });
    this.setState({data: lista, modalEditar: false});
  }

eliminar=(dato)=>{
  var opcion=window.confirm("Realmente desea eliminar el registro" +dato.id);
  if(opcion){
    var contador=0;
    var lista = this.state.data;
    lista.map((registro)=>{
      if (registro.id==dato.id){
        lista.splice(contador, 1);
      }
      contador++;
    });
    this.setState({data: lista});
  }
  
}


  render() {

    
    return (
      <>
      
        <div className="App">

        </div>
        <Container>
          <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar Nuevo Personaje</Button>
          <br /><br />
          <Table>

   
            <thead>
              <tr>
              <th>Id</th>
              <th>Personaje</th>
              <th>Anime</th>
              <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.Personaje}</td>
                  <td>{elemento.Anime}</td>
                  <td>
                    <Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>
                  {" "}
                    <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button>
                    </td>
                </tr>
              ))}
            </tbody>

          </Table>
          
        </Container>
        


        <Modal isOpen={this.state.modalInsertar}>

          <ModalHeader>
            <div><h3>Insertar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.data.length+1}/>
            </FormGroup>

            <FormGroup>
              <label>Personaje</label>
              <input className="form-control" name="Personaje" type="text" onChange={this.handleChange}/>
            </FormGroup>

            <FormGroup>
              <label>Anime:</label>
              <input className="form-control" name="Anime" type="text" onChange={this.handleChange}/>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={()=>this.insertar()} >Insertar</Button>
            <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>

          </ModalFooter>

        </Modal>

        <Modal isOpen={this.state.modalEditar}>

          <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
              </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.form.id}/>
            </FormGroup>

            <FormGroup>
              <label>Personaje:</label>
              <input className="form-control" name="Personaje" type="text" onChange={this.handleChange} value={this.state.form.Personaje}/>
            </FormGroup>

            <FormGroup>
              <label>Anime:</label>
              <input className="form-control" name="Anime" type="text" onChange={this.handleChange} value={this.state.form.Anime}/>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={()=>this.editar(this.state.form)}>Editar</Button>
            <Button color="danger"  onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>

          </ModalFooter>

        </Modal>
      </>)
  };
  

}

export default App;
