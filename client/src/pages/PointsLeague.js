import React from 'react';
import styled from 'styled-components';
import { Table } from '../ui';
import { leagueColumns } from '../utils/tableUtils';
import { device } from '../breakpoints';

const LeagueContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media ${device.lg} {
    width: 100%;
  }
`;

export const PointsLeague = ({
  screwfixTableData,
  badgersTableData,
}) => {

  return (
    <LeagueContainer>
      {bothLeaguesSorted && (
        <LeagueContainer>
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
        </LeagueContainer>
      )}
    </LeagueContainer>
  );
};
