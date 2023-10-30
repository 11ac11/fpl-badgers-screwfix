import React, { useState, useEffect } from 'react';
import { createContext } from 'react';
import { fetchFixtures, getAllGameweekInfo, fetchLeagueStandings } from '../api/requests';
import { getClosestGame, getHighestPoints, getLowestPoints, getTopOfTable, getBottomOfTable } from '../statUtils';

const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [gameweekContextData, setGameweekContextData] = useState({});
  const [gameweekNumber, setGameweekNumber] = useState(0)
  const [badgersFixtureData, setBadgersFixtureData] = useState(null)
  const [screwfixFixtureData, setScrewfixFixtureData] = useState(null)
  const [screwfixTableData, setScrewfixTableData] = useState(null);
  const [badgersTableData, setBadgersTableData] = useState(null);

  const screwfixId = 589414;
  const badgersId = 728798;
  const screwfixDivisionId = 72656;
  const badgersDivisionId = 95564;

  useEffect(() => {
    const fetchGameweekNumber = async () => {
      try {
        const res = await findCurrentGameweekNumber();
        console.log('GAMEWEEK: ', res);
        setGameweekNumber(res);
      } catch (error) {
        console.error('Error fetching gameweek number:', error);
      }
    };

    fetchGameweekNumber();
  }, [])

  useEffect(() => {
    if (gameweekNumber) {
      const fetchFixturesData = async () => {
        try {
          const screwfixId = 589414
          const badgersId = 728798
          const screwFixFixtures = await fetchFixtures(screwfixId, gameweekNumber);
          const badgersFixtures = await fetchFixtures(badgersId, gameweekNumber);
          if (screwFixFixtures) {
            setScrewfixFixtureData(screwFixFixtures.results);
          }
          if (badgersFixtures) {
            setBadgersFixtureData(badgersFixtures.results);
          }
        } catch (error) {
          console.error(`Error: ${error.message}`);
        }
      };

      fetchFixturesData()

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
    }
  }, [gameweekNumber]);

  useEffect(() => {
    if (screwfixFixtureData, badgersFixtureData, badgersTableData, screwfixTableData) {

      const gameweekAwards = {
        badgersHighest: getHighestPoints(badgersFixtureData),
        screwfixHighest: getHighestPoints(screwfixFixtureData),
        badgersLowest: getLowestPoints(badgersFixtureData),
        screwfixLowest: getLowestPoints(screwfixFixtureData),
        badgersTop: getTopOfTable(badgersTableData),
        screwfixTop: getTopOfTable(screwfixTableData),
        badgersBottom: getBottomOfTable(badgersTableData),
        screwfixBottom: getBottomOfTable(screwfixTableData),
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
        gameweekAwards
      };

      setGameweekContextData(data);
    }
  }, [screwfixFixtureData, badgersFixtureData, badgersTableData, screwfixTableData])

  const findCurrentGameweekNumber = async () => {
    const data = await getAllGameweekInfo();
    for (const event of data) {
      if (!!event.is_current) {
        return event.id;
      }
    }
    return -1;
  };

  return (
    <GeneralContext.Provider value={{ gameweekContextData }}>
      {children}
    </GeneralContext.Provider>
  );
};

export { GeneralContext, GeneralContextProvider };
