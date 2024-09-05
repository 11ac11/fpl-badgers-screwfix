import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { device } from './breakpoints';
import './App.css';
import './fonts/fonts.css';
import { HtoHLeagues } from './pages/HtoHLeagues';
import { Home } from './pages/Home';
import { Fixtures } from './pages/Fixtures';
import { CombinedPointsLeague } from './pages/CombinedPointsLeague';
import { BadgersContext } from './state/BadgersContextProvider';
import { FancyLoadingCircle } from './ui/FancyLoadingCircle';
import { Topbar } from './ui/Topbar/Topbar';
import { Sidebar } from './ui/Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 100vh;
  overflow-y: auto;
`;

const ContentContainer = styled.div`
  flex: 1;
  width: 100vw;
  max-width: 800px;
  margin: auto;
  min-height: 90vh;
  height: 100%;
  padding: 1rem 2rem;
  justify-content: center;

  @media ${device.sm} {
    padding: 0.5rem 1rem;
  }
`;

const App = () => {
  const { badgersData } = useContext(BadgersContext);
  const { currentGameweekNumber, badgersTableData, prev5Results } = badgersData;

  // const [isUpdating, setIsUpdating] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <Router>
      <LayoutContainer>
        <Sidebar
          isOpen={sidebarIsOpen}
          setIsOpen={setSidebarIsOpen}
          // screwfixTableData={screwfixTableData}
          badgersTableData={badgersTableData}
        />
        <Topbar
          gameweekNumber={currentGameweekNumber}
          sidebarIsOpen={sidebarIsOpen}
          setSidebarIsOpen={setSidebarIsOpen}
        />
        {!currentGameweekNumber && !prev5Results?.sf ?
          (
            <FancyLoadingCircle />
          ) : (
            <ContentContainer>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      // screwfixTableData={screwfixTableData}
                      badgersTableData={badgersTableData}
                    />
                  }
                />
                <Route
                  path="/h2h-league"
                  element={
                    <HtoHLeagues
                      badgersTableData={badgersTableData}
                    />
                  }
                />
                <Route
                  path="/points-league"
                  element={
                    <CombinedPointsLeague
                      // screwfixTableData={screwfixTableData}
                      badgersTableData={badgersTableData}
                    />
                  }
                />
                <Route
                  path="/fixtures-results"
                  element={<Fixtures gameweekNumber={currentGameweekNumber} />}
                />
              </Routes>
            </ContentContainer>
          )
        }
      </LayoutContainer>
    </Router>
  );
};

export default App;
