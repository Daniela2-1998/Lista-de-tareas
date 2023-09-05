import React, {useEffect, useState} from 'react';
import './App.css';
import Header from './componentes/Header';
import FormularioTareas from './componentes/FormularioTareas';
import ListaTareas from './componentes/ListaTareas';

const App = () => {

  // OBTENER TAREAS GUARDADAS DE LOCALSTORAGE 
  const tareasGuardadas = localStorage.getItem('tareas') ? 
    JSON.parse(localStorage.getItem('tareas'))
    : 
    []
  ;

  // ESTABLECEMOS EL ESTADO DE LAS TAREAS 
  const [tareas, cambiarTareas] = useState(tareasGuardadas);
    /*{ [
      
     
        id: 1,
        texto: 'Lavar ropa',
        completada: false
      },
      {
        id: 2,
        texto: 'Pasear al perro',
        completada: false
      }
      
    ]
  );
  */

  // GUARDANDO EL ESTADO DENTRO DE LOCALSTORAGE 
  useEffect(() => {
    // transforma un "objeto" en una cadena de texto JSON
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas])


  // ACCEDEMOS A LOCALSTORAGE Y COMPROBAMOS SI MOSTRARCOMPLETADAS ES NULL
  let configMostrarCompletadas = '';
  // comprobamos si es null
  if(localStorage.getItem('mostrarCompletadas') === null){
    configMostrarCompletadas = true;
  } else {
    configMostrarCompletadas = localStorage.getItem('mostrarCompletadas') === 'true';
  }



  // ESTADO DE MOSTRARCOMPLETADAS
  const [mostrarCompletadas, cambiarMostrarCompletadas] = useState(configMostrarCompletadas);
  useEffect(() => {
    // si esta en mostrar completadas, queremos mostrarlas
    localStorage.setItem('mostrarCompletadas', mostrarCompletadas.toString());
  }, [mostrarCompletadas])


  return (
    <div className='contenedor'>
      <Header
        mostrarCompletadas={mostrarCompletadas}
        cambiarMostrarCompletadas={cambiarMostrarCompletadas} 
      />
      <FormularioTareas tareas={tareas} cambiarTareas={cambiarTareas} />
      <ListaTareas 
        tareas={tareas} 
        cambiarTareas={cambiarTareas} 
        mostrarCompletadas={mostrarCompletadas}
      />
    </div>
  );
}

export default App;
