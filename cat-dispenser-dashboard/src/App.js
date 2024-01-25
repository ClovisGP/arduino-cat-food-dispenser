import './App.css';
import DisplayCase from './components/DisplayCase/DisplayCase.js'
import React, { useState, useEffect } from 'react';



function App() {
  const [lastFeed, setlastFeed] = useState('N/A');
  const [lastActivation, setLastActivation] = useState('N/A');
  const [todayFeed, setTodayFeed] = useState('0');
  const [tankStatus, setTankStatus] = useState(true);
  const [notif, setNotif] = useState(true);
  
  function refreshData() {
    fetch('http://localhost:4000/front-cat-feeds-recent')
        .then(response => response.json())
        .then(json => {json.data ? setlastFeed(json.data[0]['datetime']) : setlastFeed('N/A')})
        .catch(error => console.error(error));
    fetch('http://localhost:4000/front-cat-feeds')
        .then(response => response.json())
        .then(json => {setTodayFeed(json.data.length)})
        .catch(error => console.error(error));
    fetch('http://localhost:4000/front-dispenser-exchange')
        .then(response => response.json())
        .then(json => {json.data ? setLastActivation(json.data[0]['datetime']) : setlastFeed('N/A')})
        .catch(error => console.error(error));
  }

  function fillTank() {
    setTankStatus(true);
  }

  function notifChange() {
    setNotif(!notif);
  }

  useEffect(() => {
    refreshData();
    const intervalId = setInterval(refreshData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <div className='Caseline'>
        <DisplayCase label="Nombre de distribution aujourd'hui" content={todayFeed}></DisplayCase>
        <DisplayCase label="Etat du réservoir" content= {tankStatus ? 'Remplie' : 'Bientôt vide'}></DisplayCase>
        <DisplayCase label="Dernière activation" content={lastActivation}></DisplayCase>
      </div>
      <div className='Caseline'>
        <DisplayCase label="Dernière Distribution" content={lastFeed}></DisplayCase>
        <DisplayCase label="Marqué le réservoir plein" clickHandler={fillTank} colorButtonAlt={false}></DisplayCase>
        <DisplayCase label="Activé ou Désactivé notification" clickHandler={notifChange} colorButtonAlt={!notif} ></DisplayCase>
      </div>
      
    </div>
  );
}

export default App;
