import './App.css';
import DisplayCase from './components/DisplayCase/DisplayCase.js'
import React, { useState, useEffect } from 'react';



function App() {
  const [lastFeed, setlastFeed] = useState('N/A');
  const [todayFeed, setTodayFeed] = useState('0');
  const [tankStatus, setTankStatus] = useState(true);
  const [currentConfig, setCurrentConfig] = useState(null);
  const [notifActiv, setNotifActiv] = useState(false);
  
  function refreshData() {
    fetch('http://localhost:4000/front-cat-feeds-recent')
        .then(response => response.json())
        .then(json => {json.data ? setlastFeed(json.data[0]['datetime']) : setlastFeed('N/A')})
        .catch(error => console.error(error));
    fetch('http://localhost:4000/front-cat-feeds')
        .then(response => response.json())
        .then(json => {setTodayFeed(json.data.length ? json.data.length : '0')})
        .catch(error => console.error(error));

    fetch('http://localhost:4000/current-update')
        .then(response => response.json())
        .then(json => {json.data ? setCurrentConfig(json.data) : setCurrentConfig(null); console.log(json.data)})
        .catch(error => console.error(error));
    fetch('http://localhost:4000/front-dispenser-exchange')
        .then(response => response.json())
        .then(json => {
          fetch('http://localhost:4000/front-last-update')
            .then(response => response.json())
            .then(jsonUpdate => {
              if (new Date(json.data[0]['datetime']) > new Date(jsonUpdate.data[0]['datetime']))
                setTankStatus(false);
            })
        })
        .catch(error => console.error(error));
  }

  function fillTank() {
    setTankStatus(true);
    let tmpJSON = JSON.parse(currentConfig['json']);
    tmpJSON['tankSoonEmpty'] = false;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tmpJSON)
    };
    fetch('http://localhost:4000/create-update', requestOptions)
        .then(response => response.json())
  }

  function notifHandler() {
    setNotifActiv(!notifActiv);
  }

  useEffect(() => {
    refreshData();
    const intervalId = setInterval(refreshData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let a = 0;
    if (a !== 0 && notifActiv) {
      alert("Votre chat vient d'être nourit")
    }
    a++;
  }, [todayFeed, notifActiv]);

  return (
    <div className="App">
      <div className='Caseline'>
        <DisplayCase label="Nombre de distribution aujourd'hui" content={todayFeed}></DisplayCase>
        <DisplayCase label="Etat du réservoir" content= {tankStatus ? 'Remplie' : 'Bientôt vide'}></DisplayCase>
      </div>
      <div className='Caseline'>
        <DisplayCase label="Dernière Distribution" content={new Date(lastFeed).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })}></DisplayCase>
        <DisplayCase label="Marqué le réservoir plein" clickHandler={fillTank} colorButtonAlt={tankStatus}></DisplayCase>
        <DisplayCase label="Activé les notification" clickHandler={notifHandler} isAlt={true} colorButtonAlt={notifActiv}></DisplayCase>
      </div>
      
    </div>
  );
}

export default App;
