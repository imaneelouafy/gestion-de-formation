import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import "./style.css";


export default function Navbar() {
  const location = useLocation();
  const isEmployePage = location.pathname.includes('/employe');
  const isFormationPage = location.pathname.includes('/formation');
  const isParticipationPage = location.pathname.includes('/participation');

  return (
    <div>
      <nav>
        <ul id='ul'>
       
          <li>
          <img src="logo.png" id='img' alt="Logo" width="50" height="50"/>
          </li>
        
       
          <li><Link to='/'>Home</Link></li>
          <li id='employe'><Link to='/employe'>Employe</Link>
          {isEmployePage && (
            <ul id='employe-dropdown'>
              <li><Link to='/employe/add'>Add Employe</Link></li>
              <li><Link to='/employe/liste'>Liste Employe</Link></li>
            </ul>
          )}
          </li>
          <li id='formation'><Link to='/formation'>Formation</Link>
          {
            isFormationPage && (
              <ul id='formation-dropdown'>
                <li><Link to='/formation/add'>Add Formation</Link></li>
                <li><Link to='/formation/liste'>Liste Formation</Link></li>
              </ul>
            )}
          </li>
          <li id='participation'><Link to='/participation'>Participation</Link>
          {
            isParticipationPage && (
              <ul id='participation-dropdown'>
                <li><Link to='/participation/add'>Add Participation</Link></li>
                <li><Link to='/participation/liste'>Liste Participation</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
      {isEmployePage && <Outlet />}
    </div>
  );
}
