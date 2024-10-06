import React, { useState, useEffect } from 'react';
import { createContext } from 'react';
import { fetchFantasyFixtures, getAllGameweekInfo, fetchLeagueStandings, fetchLivePlayerScores } from '../api/requests';
import { getHighestPoints, getLowestPoints, getTopOfTable, getBottomOfTable, getLeagueTotalPoints } from '../utils/statUtils';
import { isTwoDaysAway } from '../utils/timeCheckers';

const BadgersContext = createContext();

const BadgersContextProvider = ({ children }) => {
  const [badgersData, setBadgersData] = useState({})
  const [previewNextGw, setPreviewNextGw] = useState(false)
  const [gameweekNumber, setGameweekNumber] = useState(0)
  const [badgersFixtureData, setBadgersFixtureData] = useState(null)
  const [badgersTableData, setBadgersTableData] = useState(null)
  const [pointsTableData, setPointsTableData] = useState(null)
  const [prev5Results, setPrev5Results] = useState(null)
  const [livePlayerPointsData, setLivePlayerPointsData] = useState([])

  const leagueId = 1115273;
  const pointsLeagueId = 1457213;

  useEffect(() => {
    const fetchGameweekNumber = async () => {
      try {
        const res = await findCurrentGameweekNumber();
        setGameweekNumber(res);
      } catch (error) {
        console.error('Error fetching gameweek number:', error);
      }
    };

    fetchGameweekNumber();
  }, [])

  useEffect(() => {
    if (gameweekNumber) {
      const fetchFantasyFixturesData = async () => {
        try {
          const badgersFixtures = await fetchFantasyFixtures(leagueId, gameweekNumber);
          if (badgersFixtures) {
            setBadgersFixtureData(badgersFixtures.results);
          }
        } catch (error) {
          console.error(`Error: ${error.message}`);
        }
      };

      const fetchLeaguesData = async () => {
        try {
          const badgersLeague = await fetchLeagueStandings(leagueId, gameweekNumber);
          const pointsLeague = await fetchLeagueStandings(pointsLeagueId, gameweekNumber, true);

          setBadgersTableData(badgersLeague);
          setPointsTableData(pointsLeague)
        } catch (error) {
          console.error(`Error: ${error.message}`);
        }
      };

      const fetchLast5Games = async () => {
        const last5 = {}
        let i = gameweekNumber
        while (i > gameweekNumber - 5 && i > 0) {
          const badgersFixtures = await fetchFantasyFixtures(leagueId, i);
          last5[`gw${i}`] = badgersFixtures.results
          i--;
        }
        setPrev5Results(last5)
      }

      const fetchElementLiveScores = async () => {
        const liveData = await fetchLivePlayerScores(gameweekNumber)
        setLivePlayerPointsData(liveData.elements)
      }

      fetchFantasyFixturesData()
      fetchLeaguesData()
      fetchLast5Games()
      fetchElementLiveScores()
    }
  }, [gameweekNumber]);

  useEffect(() => {
    if (badgersFixtureData && badgersTableData && prev5Results) {

      const gameweekAwards = {
        highest: getHighestPoints(badgersFixtureData),
        lowest: getLowestPoints(badgersFixtureData),
        top: getTopOfTable(badgersTableData),
        bottom: getBottomOfTable(badgersTableData),
      }

      const data = {
        leagueId,
        pointsLeagueId,
        currentGameweekNumber: gameweekNumber,
        previewNextGw,
        fixturesForGameweek: badgersFixtureData,
        badgersTableData,
        pointsTableData,
        gameweekAwards,
        badgersTotalPoints: getLeagueTotalPoints(badgersTableData),
        prev5Results,
        livePlayerPointsData
      };

      setBadgersData(data);
    }
  }, [badgersFixtureData, badgersTableData, prev5Results, gameweekNumber, livePlayerPointsData])

  const findCurrentGameweekNumber = async () => {
    const data = await getAllGameweekInfo();
    const events = data.events
    for (const event of events) {
      if (!!event.is_current) {
        // console.log('event', event)
        const twoDaysCheck = isTwoDaysAway(event.deadline_time)
        // setPreviewNextGw(twoDaysCheck ? true : false)
        return event.id
      }
    }
    return 'pre-season';
  };

  return (
    <BadgersContext.Provider value={{ badgersData }}>
      {children}
    </BadgersContext.Provider>
  );
};

export { BadgersContext, BadgersContextProvider };
