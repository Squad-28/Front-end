import React from 'react';
import './style.css';
import FotoPerfil from '../assets/fotoPerfil.svg';

const Nav = ({ onLogout }) => {
  return (
    <div className="nav">
      <div className="grid justify-items-center">
        <div className=" container flex justify-between">
          <h1 className="logo py-6">Technical Share</h1>
          <div className="nav-items flex  items-center px-14">
            <ul className="flex flex-row items-center gap-10">
              <li>
                <p>Home</p>
              </li>
              <li>
                <p>quero ser mentor</p>
              </li>
              <li>
                <img src={FotoPerfil} alt="foto de pefil" width={42} />
              </li>
              <li>
                <p>
                  Olá, <span id="nomePerfil">Clarisa!</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
