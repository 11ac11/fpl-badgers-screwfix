import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import './fonts/fonts.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {
  fetchFixtures,
  fetchLeagueStandings,
  fetchLivePlayerScores,
  fetchManagerPicksByEvent,
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
import { CombinedPointsLeague } from './pages/CombinedPointsLeague';

const LayoutContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  max-height: 100vh;
`;

const Fixtures = styled(Table)``;

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
    const fetchScrewfixStandings = async () => {
      try {
        const screwfixData = await fetchLeagueStandings(screwfixId);
        setScrewfixTableData(screwfixData);
        console.log('SF league data: ', screwfixData);
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    };

    // const fetchScrewfixFixtures = async () => {
    //   try {
    //     const screwFixFixtures = await fetchFixtures(screwfixId);
    //     console.log('SF fixtures: ', screwFixFixtures);
    //     setScrewfixFixtures(screwFixFixtures);
    //   } catch (error) {
    //     console.error(`Error: ${error.message}`);
    //   }
    // };

    const fetchBadgersStandings = async () => {
      try {
        const screwfixData = await fetchLeagueStandings(badgersId);
        if (screwfixData === 'The game is being updated') {
          setIsUpdating(true);
        } else {
          setBadgersTableData(screwfixData);
        }
        console.log('B league data: ', screwfixData);
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    };

    // const fetchBadgersFixtures = async () => {
    //   try {
    //     const screwFixFixtures = await fetchFixtures(badgersId);
    //     console.log('B fixtures: ', screwFixFixtures);
    //     setBadgersFixtures(screwFixFixtures);
    //   } catch (error) {
    //     console.error(`Error: ${error.message}`);
    //   }
    // };

    fetchScrewfixStandings();
    // fetchScrewfixFixtures();
    fetchBadgersStandings();
    // fetchBadgersFixtures();
    // fetchLiveScores();
    // fetchManagerPicks();
  }, []);

  useEffect(() => {
    setGameweekNumber(screwfixFixtures?.results[0].event);
    console.log('gameweek: ', gameweekNumber);
  }, [screwfixFixtures]);

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
            <Route path="/">home</Route>
            <Route path="/tables" element={<Tables />} />
            <Route path="/fixtures">fixtures</Route>
            <Route path="/live">live</Route>
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
