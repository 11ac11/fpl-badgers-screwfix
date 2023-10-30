import React, { useEffect, useState, useMemo } from 'react';
import Table from '../ui/Table';
import styled from 'styled-components';
import { leagueColumns } from '../tableUtils';
import { device } from '../breakpoints';

const BothLeaguesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  height: 100%;
  margin-bottom: 2rem;
  @media ${device.lg} {
    flex-direction: column;
    align-items: center;
  }
`;

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
      <BothLeaguesContainer>
        <Table
          columns={leagueColumns}
          data={bothLeaguesSorted.slice(0, 20)}
          tableClassName="league-table top-half"
          theadClassName="league-thead"
          thClassName="league-th"
          tbodyClassName="league-tbody"
          trClassName="league-tr"
          tdClassName="league-td"
        />
        <Table
          columns={leagueColumns}
          data={bothLeaguesSorted.slice(-20)}
          tableClassName="league-table bottom-half"
          theadClassName="league-thead"
          thClassName="league-th"
          tbodyClassName="league-tbody"
          trClassName="league-tr"
          tdClassName="league-td"
        />
      </BothLeaguesContainer>
      )}
    </LeagueContainer>
  );
};
