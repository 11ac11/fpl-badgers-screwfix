import React, { useState, useEffect } from 'react';
import { createContext } from 'react';
import { fetchFixtures, getAllGameweekInfo } from '../api/requests';
import { getClosestGame, getHighestPoints, getLowestPoints } from '../statUtils';

const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [gameweekContextData, setGameweekContextData] = useState({});
  const [gameweekNumber, setGameweekNumber] = useState(0)
  const [badgersTableData, setBadgersTableData] = useState(null)
  const [screwfixTableData, setScrewfixTableData] = useState(null)

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
        // Handle the error appropriately
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
            setScrewfixTableData(screwFixFixtures.results);
          }
          if (badgersFixtures) {
            setBadgersTableData(badgersFixtures.results);
          }
        } catch (error) {
          console.error(`Error: ${error.message}`);
        }
      };

      fetchFixturesData()
    }
  }, [gameweekNumber]);

  useEffect(() => {
    if (screwfixTableData, badgersTableData) {

      const gameweekAwards = {
        screwfixHighest: getHighestPoints(screwfixTableData),
        screwfixLowest: getLowestPoints(screwfixTableData),
        badgersHighest: getHighestPoints(badgersTableData),
        badgersLowest: getLowestPoints(badgersTableData),
      }
      const data = {
        screwfixId,
        badgersId,
        screwfixDivisionId,
        badgersDivisionId,
        currentGameweekNumber: gameweekNumber,
        sfFixturesThisGw: screwfixTableData,
        baFixturesThisGw: badgersTableData,
        gameweekAwards
      };

      setGameweekContextData(data);
    }
  }, [screwfixTableData, badgersTableData])

  useEffect(() => {

  })

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
