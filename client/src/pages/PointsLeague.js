import React from 'react';
import styled from 'styled-components';
import { Table } from '../ui';
import { classicLeagueColumns } from '../utils/tableUtils';
import { device } from '../breakpoints';

const LeagueContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media ${device.lg} {
    width: 100%;
  }
`;

export const PointsLeague = ({ pointsTableData }) => {

  return (
    <LeagueContainer>
      <Table
        columns={classicLeagueColumns}
        data={pointsTableData.standings.results}
        tableClassName="league-table"
        theadClassName="league-thead"
        thClassName="league-th"
        tbodyClassName="league-tbody"
        trClassName="league-tr"
        tdClassName="league-td"
      />
    </LeagueContainer>
  );
};
