import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import './fonts/fonts.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  fetchFixtures,
  fetchLeagueStandings,
  fetchLivePlayerScores,
  fetchManagerPicksByEvent,
  getAllGameweekInfo,
} from './api/requests';
import styled from 'styled-components';
import { Topbar } from './ui/Topbar/Topbar';
import { Sidebar } from './ui/Sidebar';
import { Tables } from './pages/Tables';
import { Home } from './pages/Home';
import { Live } from './pages/Live';
import { Fixtures } from './pages/Fixtures';
import { CombinedPointsLeague } from './pages/CombinedPointsLeague';
import { GeneralContext } from './state/GeneralContextProvider'; // Replace with the actual path to your context provider


const LayoutContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ContentContainer = styled.div`
  flex: 1;
  width: 100vw;
  min-height: 90vh;
  height: 90vh;
  overflow-y: auto;
  padding: 1rem 2rem;
  justify-content: center;
`;

export const screwfixId = 589414
export const badgersId = 728798
export const screwfixDivisionId = 72656
export const badgersDivisionId = 95564

const App = () => {
  const { gameweekContextData } = useContext(GeneralContext);
  const { currentGameweekNumber } = gameweekContextData;

  console.log(gameweekContextData)

  const [screwfixTableData, setScrewfixTableData] = useState(null);
  const [badgersTableData, setBadgersTableData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  useEffect(() => {
    const fetchLeaguesData = async () => {
      try {
        const screwfixData = await fetchLeagueStandings(screwfixId);
        const badgersLeague = await fetchLeagueStandings(badgersId);

        setScrewfixTableData(screwfixData);
        setBadgersTableData(badgersLeague);
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    };

    fetchLeaguesData();
    // fetchLiveScores();
    // fetchManagerPicks();
  }, []);


  return (
    <Router>
      <LayoutContainer>
        <Sidebar
          isOpen={sidebarIsOpen}
          setIsOpen={setSidebarIsOpen}
          screwfixTableData={screwfixTableData}
          badgersTableData={badgersTableData}
        />
        <Topbar
          gameweekNumber={currentGameweekNumber}
          sidebarIsOpen={sidebarIsOpen}
          setSidebarIsOpen={setSidebarIsOpen}
        />
        <ContentContainer>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  screwfixTableData={screwfixTableData}
                  badgersTableData={badgersTableData}
                />
              }
            />
            <Route path="/tables" element={<Tables />} />
            <Route
              path="/points-league"
              element={
                <CombinedPointsLeague
                  screwfixTableData={screwfixTableData}
                  badgersTableData={badgersTableData}
                />
              }
            />
            <Route
              path="/current"
              element={
                <Fixtures
                  gameweekNumber={currentGameweekNumber}
                />
              }
            />
                        <Route
              path="/fixtures-results"
              element={
                <Fixtures
                  gameweekNumber={currentGameweekNumber}
                />
              }
            />
            <Route path="/live" element={<Live />} />
          </Routes>
        </ContentContainer>
      </LayoutContainer>
    </Router>
  );
};

export default App;
