import React, { useState, useEffect } from 'react';
import { createContext } from 'react';
import { getAllGameweekInfo } from '../api/requests';

const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [gameweekContextData, setGameweekContextData] = useState({});
  const [gameweekNumber, setGameweekNumber] = useState(0)

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
      const data = {
        screwfixId,
        badgersId,
        screwfixDivisionId,
        badgersDivisionId,
        currentGameweekNumber: gameweekNumber,
      };

      setGameweekContextData(data);
    }
  }, [gameweekNumber]);

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
