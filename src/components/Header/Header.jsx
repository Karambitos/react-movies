import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <nav className="contentMaxWidth">
        <NavLink className="nav-link" to="/" end>
          Home
        </NavLink>
        <NavLink className="nav-link" to="/movies">
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
