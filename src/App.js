import React from 'react';
import './App.scss';
import {Route} from 'react-router-dom';
import Header from './component/Header/Header';
import CampaignList from "./component/CampaignList";

function App() {
  return (
    <React.Fragment>
        <Header></Header>
          <Route path='/' exact strict render={() => {
              return (<CampaignList/>)
          }}/>
    </React.Fragment>
  );
}

export default App;
