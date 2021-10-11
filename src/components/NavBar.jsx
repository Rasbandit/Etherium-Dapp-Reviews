import React from 'react';
import { Nav, NavGroup } from './Styles';
import { IconPodiumLogo } from '@podiumhq/icons';

const NavBar = ({ connectedAccount }) => {
  return (
    <Nav>
      <NavGroup>
        <IconPodiumLogo />
        <h1>Podium Reviews</h1>
      </NavGroup>
      <p>
        Wallet Address:{' '}
        {connectedAccount ? connectedAccount : 'WALLET ADDRESS LOADING'}
      </p>
    </Nav>
  );
};

export default NavBar;
