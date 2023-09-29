import React, { useEffect, useState, useMemo } from 'react';
import Table from '../ui/Table';
import styled from 'styled-components';
import { leagueColumns } from '../tableUtils';

const LeagueContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 50vw;
`;

export const CombinedPointsLeague = ({
  screwfixTableData,
  badgersTableData,
}) => {
  const [combinedLeagueData, setCombinedLeagueData] = useState(null);
  const [combinedAndSortedData, setCombinedAndSortedData] = useState(null);

  useEffect(() => {
    if (screwfixTableData && badgersTableData) {
      const screwfixNewRank = screwfixTableData.standings.results.map(
        (team) => {
          const { rank, ...rest } = team;
          return { rank: `${rank} (S)`, ...rest };
        }
      );
      const badgersNewRank = badgersTableData.standings.results.map((team) => {
        const { rank, ...rest } = team;
        return { rank: `${rank} (B)`, ...rest };
      });

      const bothLeagues = [...badgersNewRank, ...screwfixNewRank];
      setCombinedLeagueData(bothLeagues);
    }
    setCombinedAndSortedData(bothLeaguesSorted);
  }, [screwfixTableData, badgersTableData]);

  // Use useMemo to sort the data
  const bothLeaguesSorted = useMemo(() => {
    if (combinedLeagueData) {
      return [...combinedLeagueData].sort(
        (a, b) => b.points_for - a.points_for
      );
    }
  }, [screwfixTableData, badgersTableData]);

  console.log(screwfixTableData, badgersTableData, bothLeaguesSorted);

  return (
    <LeagueContainer>
      {bothLeaguesSorted && (
        <Table
          columns={leagueColumns}
          data={bothLeaguesSorted}
          tableClassName="league-table"
          theadClassName="league-thead"
          thClassName="league-th"
          tbodyClassName="league-tbody"
          trClassName="league-tr"
          tdClassName="league-td"
        />
      )}
    </LeagueContainer>
  );
};
