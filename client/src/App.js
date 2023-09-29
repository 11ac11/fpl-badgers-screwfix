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
import { Topbar } from './ui/Topbar';
import { Sidebar } from './ui/Sidebar';
import { Tables } from './pages/Tables';
import { Home } from './pages/Home';
import { Live } from './pages/Live';
import { Fixtures } from './pages/Fixtures';
import { CombinedPointsLeague } from './pages/CombinedPointsLeague';

const LayoutContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  max-height: 100vh;
`;

const ThirdContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 33%;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 75vw;
  height: 90vh;
  overflow-y: auto;
  padding: 1rem;
  justify-content: center;
`;

const TableContainer = styled.div``;

const screwfixId = 589414;
const badgersId = 728798;

const App = () => {
  const [gameweekNumber, setGameweekNumber] = useState(null);
  const [screwfixTableData, setScrewfixTableData] = useState(null);
  const [screwfixFixtures, setScrewfixFixtures] = useState(null);
  const [badgersTableData, setBadgersTableData] = useState(null);
  const [badgersFixtures, setBadgersFixtures] = useState(null);
  const [badgeFixTable, setBadgeFixTable] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchGameweekNumber = async () => {
      try {
        const res = await findCurrentGameweekNumber();
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
    console.log(gameweekNumber, ' ---------------------------- ');
    if (gameweekNumber) {
      fetchFixturesData();
    }
  }, [gameweekNumber]);

  const findCurrentGameweekNumber = async () => {
    const data = await getAllGameweekInfo();
    for (const event of data) {
      if (event.is_current === true) {
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
        console.log('hitttttinng', screwFixFixtures);
        setScrewfixFixtures(screwFixFixtures);
      }
      //console.log('SF fixtures: ', screwFixFixtures);
      setBadgersFixtures(badgersFixtures);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  // const fetchLiveScores = async () => {
  //   try {
  //     const liveScores = await fetchLivePlayerScores(gameweekNumber);
  //     console.log('LIVE SCORES', liveScores);
  //   } catch (error) {
  //     console.error(`Error: ${error.message}`);
  //   }
  // };

  // const fetchManagerPicks = async () => {
  //   try {
  //     const managerPicks = await fetchManagerPicksByEvent(
  //       1034149,
  //       gameweekNumber
  //     );
  //     console.log('manager picks', managerPicks);
  //   } catch (error) {
  //     console.error(`Error: ${error.message}`);
  //   }
  // };

  return (
    <Router>
      <LayoutContainer>
        <Topbar gameweekNumber={gameweekNumber} />
        <Sidebar />
        <ContentContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tables" element={<Tables />} />
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
            <Route
              path="/points-league"
              element={
                <CombinedPointsLeague
                  screwfixTableData={screwfixTableData}
                  badgersTableData={badgersTableData}
                />
              }
            />
          </Routes>
        </ContentContainer>
      </LayoutContainer>
    </Router>
  );
};

export default App;
