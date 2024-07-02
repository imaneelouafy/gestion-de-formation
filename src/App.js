import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Formation from './component/formation/Formation';
import AddFormation from './component/formation/AddFormation';

import UpdateFormation from './component/formation/UpdateFormation';
import Employe from './component/employe/Employe';
import AddEmploye from './component/employe/AddEmploye';

import Navbar from './component/Navbar';
import EmployeListe from './component/employe/EmployeListe'
import FormationListe from './component/formation/FormationListe'
import store from './component/redux/store';
import { Provider } from 'react-redux';
import Participation from './component/participation/Participation';

import ParticipationList from './component/participation/ParticipationListe';
import AddParticipation from './component/participation/AddParticipation';
import UpdateParticipation from './component/participation/UpdateParticipation';


const App = () => {
  return (
    <Provider store={store}>  
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employe" element={<Employe />} />
            <Route path="/employe/add" element={<AddEmploye />} />
            <Route path="/employe/liste" element={<EmployeListe />} />
            <Route path="//formation/liste" element={<Formation />} />
            <Route path="/formation/add" element={<AddFormation />} />
            <Route path="/formation" element={<FormationListe />} /> {/* Add this route */}
            <Route path="/formation/edit/:id" element={<UpdateFormation />} /> {/* Route for UpdateFormation */}

            {/* <Route path="/update/:id" component={UpdateFormation} /> */}


            <Route path="/participation" element={<Participation />} />
            <Route path="/participation/add" element={<AddParticipation />} />
            <Route path="/participation/liste" element={<ParticipationList />} />
            <Route path="/participation/update/:id" element={<UpdateParticipation />} />

            
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
