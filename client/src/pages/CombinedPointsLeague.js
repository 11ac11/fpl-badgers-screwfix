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

  console.log('11111111', screwfixTableData, badgersTableData);

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
  }, [screwfixTableData, badgersTableData]);

  // Use useMemo to sort the data
  const bothLeaguesSorted = useMemo(() => {
    if (combinedLeagueData) {
      return [...combinedLeagueData].sort(
        (a, b) => b.points_for - a.points_for
      );
    }
  }, [badgersTableData]);

  console.log(bothLeaguesSorted);

  return (
    <LeagueContainer>
      {/* <Image src={badgersDiv1Image} alt="Badgers divison one" width="20%" /> */}
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
