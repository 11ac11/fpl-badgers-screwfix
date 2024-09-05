import React from 'react';
import styled from 'styled-components';
import { Table } from '../ui';
import { device } from '../breakpoints';
import { leagueColumns } from '../utils/tableUtils';

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
  flex-direction: column;
  width: 100%;
  align-items: center;
  @media ${device.lg} {
    width: 100%;
  }
`;

export const HtoHLeagues = ({ badgersTableData, screwfixTableData }) => {
  const badgersStandings = badgersTableData?.standings?.results
  // const screwfixStandings = screwfixTableData?.standings?.results

  const commonLeagueProps = {
    columns: leagueColumns,
    tableClassName: "league-table",
    theadClassName: "league-thead",
    thClassName: "league-th",
    tbodyClassName: "league-tbody",
    trClassName: "league-tr",
    tdClassName: "league-td"
  }

  const badgersLeagueProps = {
    ...commonLeagueProps,
    data: badgersStandings,
  }

  // const screwfixLeagueProps = {
  //   ...commonLeagueProps,
  //   data: screwfixStandings,
  // }

  return (
    <>
      {/*<BothLeaguesContainer>*/}
      <LeagueContainer>
        {badgersStandings?.length < 1 && `FPL haven't released the table info yet, checkback on GW1.`}
        {badgersStandings?.length > 0 && <Table {...badgersLeagueProps} />}
      </LeagueContainer>
      {/* <LeagueContainer>
        {screwfixStandings?.length < 1 && `FPL haven't released the table info yet, checkback on GW1.`}
        {screwfixStandings?.length > 0 && <Table {...screwfixLeagueProps} />}
        </LeagueContainer> */}
      {/*</BothLeaguesContainer>*/}
    </>
  );
};
