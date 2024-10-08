import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../breakpoints';

const SidebarContainer = styled.div`
  &.sidebar {
    position: absolute;
    z-index: 3;
    left: 0;
    top: 0;
    background-color: var(--white);
    font-size: 2.5rem;
    height: 100vh;
    padding-left: 2rem;
    padding-right: 2rem;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: left 0.3s ease;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(9.4px);
    -webkit-backdrop-filter: blur(9.4px);
  }

  &.sidebar.closed {
    left: -100%;
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
    font-size: 2rem;
  }

  a:hover {
    color: var(--black);
  }

  @media ${device.md} {
    justify-content: center;

    &.sidebar {
      width: 100%;
    }

    li {
      justify-content: space-between;
      margin: 0.25rem 0;
    }

    a {
      font-size: 2.5rem;
    }
  }
`;

const NavSection = styled.nav`
  position: relative;
  top: 10%;
`;

const StatSection = styled.div`
  height: 20%;

  h3 {
    margin: 0;
    position: relative;
    display: inline-block;
    border-bottom: 1px solid transparent;
    font-size: 2rem;

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

export const Sidebar = ({
  isOpen,
  setIsOpen,
  screwfixTableData,
  badgersTableData,
}) => {
  const sidebarClassName = isOpen ? 'sidebar' : 'sidebar closed';
  const badgersLeader = badgersTableData?.standings?.results[0]?.player_name;
  // const screwfixLeader = screwfixTableData?.standings?.results[0]?.player_name;

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
            <Link to="/h2h-league" onClick={() => setIsOpen(false)}>
              H2H League
            </Link>
          </li>
          <li>
            <Link to="/points-league" onClick={() => setIsOpen(false)}>
              Points League
            </Link>
          </li>
          {/* <li>
            <Link to="/current" onClick={() => setIsOpen(false)}>
              Current Gameweek
            </Link>
          </li> */}
          <li>
            <Link to="/fixtures-results" onClick={() => setIsOpen(false)}>
              Fixtures/Results
            </Link>
          </li>
          {/* <li>
            <Link to="/team" onClick={() => setIsOpen(false)}>Team</Link>
          </li> */}
        </ul>
      </NavSection>
      <StatSection>
        <h3>Current Leader:</h3>
        <span>{badgersLeader} 🏆</span>
        {/* <span>Screwfix: {screwfixLeader}</span> */}
      </StatSection>
    </SidebarContainer>
  );
};
