import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SidebarContainer = styled.div`
  font-size: 32px;
  padding-left: 2rem;
  height: 90vh;
  width: 25vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0.5rem 0;
  }

  a {
    color: grey;
    font-size: 24px;
  }

  a:hover {
    color: var(--black);
  }
`;

const NavSection = styled.nav`
  height: 60%;
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
`;

export const Sidebar = ({ gameweekNumber }) => {
  return (
    <SidebarContainer>
      <NavSection>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tables">Tables</Link>
          </li>
          <li>
            <Link to="/points-league">Points League</Link>
          </li>
          <li>
            <Link to="/fixtures">Fixtures</Link>
          </li>
          <li>
            <Link to="/live">Live Gameweek</Link>
          </li>
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
