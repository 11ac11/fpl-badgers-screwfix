import React, { useState, useEffect, useMemo } from 'react';

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

  const getHighestPoints = (entries) => {
    if (Array.isArray(entries)) {
      let winner = null;
      let points = -Infinity;

      for (const entry of entries) {
        const entry1Points = entry.entry_1_points;
        const entry2Points = entry.entry_2_points;

        if (entry1Points > points) {
          points = entry1Points;
          winner = entry.entry_1_name;
        }

        if (entry2Points > points) {
          points = entry2Points;
          winner = entry.entry_2_name;
        }
      }

      return { winner, points };
    }
  };

  const getLowestPoints = (entries) => {
    if (Array.isArray(entries)) {
      let winner = null;
      let points = Infinity;

      for (const entry of entries) {
        const entry1Points = entry.entry_1_points;
        const entry2Points = entry.entry_2_points;

        if (entry1Points < points) {
          points = entry1Points;
          winner = entry.entry_1_name;
        }

        if (entry2Points < points) {
          points = entry2Points;
          winner = entry.entry_2_name;
        }
      }

      return { winner, points };
    }
  };
  // const lowestPoints =
  // const closestFixture =

  return (
    highestPoints &&
    lowestPoints && (
      <>
        <p>
          {`🐐: ${highestPoints.winner} `}
          <span>{highestPoints.points}</span>
        </p>

        <p>
          {`😳: ${lowestPoints.winner} `}
          <span>{lowestPoints.points}</span>
        </p>
      </>
    )
  );
};
