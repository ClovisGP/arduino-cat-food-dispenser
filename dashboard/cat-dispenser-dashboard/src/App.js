import './App.css';
import DisplayCase from './components/DisplayCase/DisplayCase.js'
import React, { useState } from 'react';



function App() {
  const [data, setData] = useState(null);
  
  function getDate() {
    fetch('http://localhost:4000/front-cat-feeds')
        .then(response => response.json())
        .then(json => {setData(json.data); console.log(data);})
        .catch(error => console.error(error));
  }

  return (
    <div className="App">
      <div className='Caseline'>
        <DisplayCase label="Nombre de distribution aujourd'hui" content='une date'></DisplayCase>
        <DisplayCase label="Etat du réservoir" content= {false ? 'Remplie' : 'Bientôt vide'}></DisplayCase>
        <DisplayCase label="Dernière activation" content='une date'></DisplayCase>
      </div>
      <div className='Caseline'>
        <DisplayCase label="Dernière Distribution" content='une date et linfo'></DisplayCase>
        <DisplayCase label="Marqué le réservoir plein" clickHandler={()=> getDate}></DisplayCase>
        <DisplayCase label="Activé ou désactivé notification" clickHandler={()=> {}}></DisplayCase>
      </div>
      
    </div>
  );
}

export default App;
