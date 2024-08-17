import React, { useState, useEffect } from 'react';
import { createContext } from 'react';
import { fetchFantasyFixtures, getAllGameweekInfo, fetchLeagueStandings } from '../api/requests';
import { getHighestPoints, getLowestPoints, getTopOfTable, getBottomOfTable, getLeagueTotalPoints } from '../utils/statUtils';
import { isTwoDaysAway } from '../utils/timeCheckers';

const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [gameweekContextData, setGameweekContextData] = useState({});
  const [gameweekNumber, setGameweekNumber] = useState(0)
  const [badgersFixtureData, setBadgersFixtureData] = useState(null)
  const [screwfixFixtureData, setScrewfixFixtureData] = useState(null)
  const [screwfixTableData, setScrewfixTableData] = useState(null);
  const [badgersTableData, setBadgersTableData] = useState(null);
  const [prev5Results, setPrev5Results] = useState(null)

  const screwfixId = 589414;
  const badgersId = 728798;
  const screwfixDivisionId = 72656;
  const badgersDivisionId = 95564;

  const newBadgersId = 1115273;

  useEffect(() => {
    const fetchGameweekNumber = async () => {
      try {
        const res = await findCurrentGameweekNumber();
        setGameweekNumber(1);
      } catch (error) {
        console.error('Error fetching gameweek number:', error);
      }
    };

    fetchGameweekNumber();
  }, [])

  useEffect(() => {
    if (gameweekNumber) {
      const data = {
        currentGameweekNumber: gameweekNumber,
      };
      setGameweekContextData(data);
    }
  }, [gameweekNumber])

  useEffect(() => {
    if (gameweekNumber) {
      const fetchFantasyFixturesData = async () => {
        try {
          // const screwFixFixtures = await fetchFantasyFixtures(screwfixId, gameweekNumber);
          const badgersFixtures = await fetchFantasyFixtures(newBadgersId, gameweekNumber);
          // if (screwFixFixtures) {
          //   setScrewfixFixtureData(screwFixFixtures.results);
          // }
          if (badgersFixtures) {
            setBadgersFixtureData(badgersFixtures.results);
          }
        } catch (error) {
          console.error(`Error: ${error.message}`);
        }
      };


      const fetchLeaguesData = async () => {
        try {
          // const screwfixData = await fetchLeagueStandings(screwfixId, gameweekNumber);
          const badgersLeague = await fetchLeagueStandings(newBadgersId, gameweekNumber);

          // setScrewfixTableData(screwfixData);
          setBadgersTableData(badgersLeague);
        } catch (error) {
          console.error(`Error: ${error.message}`);
        }
      };

      fetchFantasyFixturesData()
      fetchLeaguesData();
      fetchLast5Games()
    }
  }, [gameweekNumber]);

  useEffect(() => {
    if (screwfixFixtureData && badgersFixtureData && badgersTableData && screwfixTableData && prev5Results) {

      const gameweekAwards = {
        badgersHighest: getHighestPoints(badgersFixtureData),
        // screwfixHighest: getHighestPoints(screwfixFixtureData),
        badgersLowest: getLowestPoints(badgersFixtureData),
        // screwfixLowest: getLowestPoints(screwfixFixtureData),
        badgersTop: getTopOfTable(badgersTableData),
        // screwfixTop: getTopOfTable(screwfixTableData),
        badgersBottom: getBottomOfTable(badgersTableData),
        // screwfixBottom: getBottomOfTable(screwfixTableData),
      }
      const data = {
        screwfixId,
        badgersId,
        screwfixDivisionId,
        badgersDivisionId,
        currentGameweekNumber: gameweekNumber,
        baFixturesThisGw: badgersFixtureData,
        sfFixturesThisGw: screwfixFixtureData,
        screwfixTableData,
        badgersTableData,
        gameweekAwards,
        badgersTotalPoints: getLeagueTotalPoints(badgersTableData),
        screwfixTotalPoints: getLeagueTotalPoints(screwfixTableData),
        prev5Results
      };

      setGameweekContextData(data);
    }
  }, [screwfixFixtureData, badgersFixtureData, badgersTableData, screwfixTableData, prev5Results, gameweekNumber])

  const findCurrentGameweekNumber = async () => {
    const data = await getAllGameweekInfo();
    const events = data.events
    for (const event of events) {
      if (!!event.is_current) {
        const twoDaysCheck = isTwoDaysAway(event.deadline_time)
        return twoDaysCheck ? event.id + 1 : event.id
      } else {
        // if (events[0].is_next) {
        //   return 1
        // }
      }
    }
    return 'pre-season';
  };

  const fetchLast5Games = async () => {
    const last5 = {
      sf: {},
      ba: {}
    }
    let i = gameweekNumber
    while (i > gameweekNumber - 5 && i > 0) {
      // const screwFixFixtures = await fetchFantasyFixtures(screwfixId, i);
      const badgersFixtures = await fetchFantasyFixtures(newBadgersId, i);
      // last5.sf[`gw${i}`] = screwFixFixtures.results
      last5.ba[`gw${i}`] = badgersFixtures.results
      i--;
    }
    setPrev5Results(last5)
  }


  return (
    <GeneralContext.Provider value={{ gameweekContextData }}>
      {children}
    </GeneralContext.Provider>
  );
};

export { GeneralContext, GeneralContextProvider };
