import React, { useState, useEffect, useMemo } from 'react';
import { getHighestPoints, getLowestPoints, closestGame } from '../statUtils';

export const Home = ({
  screwfixTableData,
  badgersTableData,
  screwfixFix,
  badgersFix,
}) => {
  const [highestPoints, setHighestPoints] = useState(null);
  const [lowestPoints, setLowestPoints] = useState(null);
  useEffect(() => {
    if (screwfixFix && badgersFix) {
      const combinedLeagues = [...screwfixFix?.results, ...badgersFix?.results];

      const highestPointsThisGW = getHighestPoints(combinedLeagues);
      const lowestPointsThisGw = getLowestPoints(combinedLeagues);
      setHighestPoints(highestPointsThisGW);
      setLowestPoints(lowestPointsThisGw);
    }
  }, [screwfixFix, badgersFix]);

  // const lowestPoints =
  // const closestFixture =

  return (
    highestPoints &&
    lowestPoints && (
      <>
        <p>
          {`🐐: ${highestPoints.winner} `}
          <span>{highestPoints.team} </span>
          <span>{highestPoints.points}</span>
        </p>

        <p>
          {`😳: ${lowestPoints.winner} `}
          <span>{lowestPoints.team} </span>
          <span>{lowestPoints.points}</span>
        </p>
      </>
    )
  );
};
