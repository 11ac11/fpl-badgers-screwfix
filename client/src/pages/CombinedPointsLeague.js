import React, { useEffect, useState, useMemo } from 'react';
import Table from '../ui/Table';
import styled from 'styled-components';
import { leagueColumns } from '../tableUtils';

const LeagueContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const CombinedPointsLeague = ({
  screwfixTableData,
  badgersTableData,
}) => {
  const [combinedLeagueData, setCombinedLeagueData] = useState(null);
  // Use useMemo to sort the data
  const bothLeaguesSorted = useMemo(() => {
    if (combinedLeagueData) {
      return [...combinedLeagueData].sort(
        (a, b) => b.points_for - a.points_for
      );
    }
  }, [combinedLeagueData]);

  useEffect(() => {
    if (screwfixTableData && badgersTableData) {
      const screwfixNewRank = screwfixTableData.standings.results.map(
        (team) => {
          return { ...team, league: 'screwfix' };
        }
      );
      const badgersNewRank = badgersTableData.standings.results.map((team) => {
        return { ...team, league: 'badgers' };
      });

      const bothLeagues = [...badgersNewRank, ...screwfixNewRank];
      setCombinedLeagueData(bothLeagues);
    }
  }, [screwfixTableData, badgersTableData]);

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
