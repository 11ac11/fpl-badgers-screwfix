import React, { useState, useEffect, useMemo } from 'react';
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
import Table from './ui/Table';
import Image from './ui/Image';
import styled from 'styled-components';
import { leagueColumns, fixtureColumns, badgeFixColumns } from './tableUtils';
import screwfixDiv2Image from './images/screwfix-div-2.png';
import badgersDiv1Image from './images/badgers-div-1.png';
import { Topbar } from './ui/Topbar/Topbar';
import { Sidebar } from './ui/Sidebar';
import { Tables } from './pages/Tables';
import { Home } from './pages/Home';
import { Live } from './pages/Live';
import { Fixtures } from './pages/Fixtures';
import { CombinedPointsLeague } from './pages/CombinedPointsLeague';

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

export const screwfixId = 589414 || 72656; // league id || division id
export const badgersId = 728798
export const screwfixDivisionId = 72656
export const badgersDivisionId = 95564

const App = () => {
  const [gameweekNumber, setGameweekNumber] = useState(null);
  const [screwfixTableData, setScrewfixTableData] = useState(null);
  const [screwfixFixtures, setScrewfixFixtures] = useState(null);
  const [badgersTableData, setBadgersTableData] = useState(null);
  const [badgersFixtures, setBadgersFixtures] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  useEffect(() => {
    const fetchGameweekNumber = async () => {
      try {
        const res = await findCurrentGameweekNumber();
        console.log('GAMEWEEK', res);
        setGameweekNumber(res);
      } catch (error) {
        console.error('Error fetching gameweek number:', error);
        // Handle the error appropriately
      }
    };

    fetchGameweekNumber();

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

  useEffect(() => {
    if (gameweekNumber) {
      fetchFixturesData();
    }
  }, [gameweekNumber]);

  const findCurrentGameweekNumber = async () => {
    const data = await getAllGameweekInfo();
    for (const event of data) {
      if (!!event.is_current) {
        return event.id;
      }
    }
    // Return a default value (e.g., -1) if no current event is found
    return -1;
  };

  const fetchFixturesData = async () => {
    try {
      const screwFixFixtures = await fetchFixtures(screwfixId, gameweekNumber);
      const badgersFixtures = await fetchFixtures(badgersId, gameweekNumber);
      if (screwFixFixtures) {
        setScrewfixFixtures(screwFixFixtures);
      }
      if (badgersFixtures) {
        setBadgersFixtures(badgersFixtures);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

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
          gameweekNumber={gameweekNumber}
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
                  screwfixFix={screwfixFixtures}
                  badgersFix={badgersFixtures}
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
              path="/fixtures"
              element={
                <Fixtures
                  screwfixFix={screwfixFixtures}
                  badgersFix={badgersFixtures}
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
