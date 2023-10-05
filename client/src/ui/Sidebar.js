import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { device } from '../breakpoints';

const SidebarContainer = styled.div`
  &.sidebar {
    background-color: var(--white);
    font-size: 32px;
    position: relative;
    padding-left: 2rem;
    height: 90vh;
    flex: 0 0 0%;
    width: 0;
    left: -20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: left 0.3s ease;
  }

  &.sidebar.open {
    left: 0;
    width: 20vw;
    flex: 0 0 20%;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: flex;
    margin: 0.5rem 0;
  }

  a {
    color: var(--grey);
    font-size: 24px;
  }

  a:hover {
    color: var(--black);
  }

  @media ${device.md} {
    justify-content: center;
    li {
      margin: 0.25rem 0;
    }

    a {
      font-size: 16px;
    }
  }
`;

const NavSection = styled.nav`
  top: -20%;
`;

const StatSection = styled.div`
  height: 20%;

  h3 {
    margin: 0;
    position: relative;
    display: inline-block;
    border-bottom: 1px solid transparent;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.25rem;
      background-image: var(--gradient);
    }
  }

  span {
    font-family: Jetbrains mono;
    display: block;
    font-size: 16px;
  }

  @media ${device.sm} {
    display: none;
  }
`;

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const sidebarClassName = isOpen ? 'sidebar open' : 'sidebar';

  return (
    <SidebarContainer className={sidebarClassName}>
      <NavSection>
        <ul>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/tables" onClick={() => setIsOpen(false)}>
              Tables
            </Link>
          </li>
          <li>
            <Link to="/points-league" onClick={() => setIsOpen(false)}>
              Points League
            </Link>
          </li>
          <li>
            <Link to="/fixtures" onClick={() => setIsOpen(false)}>
              Fixtures
            </Link>
          </li>
          {/* <li>
            <Link to="/live">Live Gameweek</Link>
          </li> */}
        </ul>
      </NavSection>
      <StatSection>
        <h3>Leaders:</h3>
        <span>Badgers: Player X</span>
        <span>Screwfix: Player Y</span>
      </StatSection>
    </SidebarContainer>
  );
};
