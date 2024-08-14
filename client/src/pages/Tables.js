import React, { useEffect, useState } from 'react';
import Table from '../ui/Table';
import styled from 'styled-components';
import { fetchLeagueStandings } from '../api/requests';
import { device } from '../breakpoints';
import { leagueColumns } from '../utils/tableUtils';

const screwfixId = 589414;
const badgersId = 728798;
const newBadgersId = 1115273;


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
  width: 60%;
  @media ${device.lg} {
    width: 100%;
  }
`;

export const Tables = () => {
  const [leagueOneData, setLeagueOneData] = useState(null);
  const [leagueTwoData, setLeagueTwoData] = useState(null);

  useEffect(() => {
    // const fetchScrewfixStandings = async () => {
    //   try {
    //     const screwfixData = await fetchLeagueStandings(screwfixId, 38);
    //     setLeagueTwoData(screwfixData);
    //   } catch (error) {
    //     console.error(`Error: ${error.message}`);
    //   }
    // };

    const fetchBadgersStandings = async () => {
      try {
        const badgersData = await fetchLeagueStandings(newBadgersId);
        if (badgersData) {
          setLeagueOneData(badgersData);
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    };

    // fetchScrewfixStandings();
    fetchBadgersStandings();
  }, []);

  return (
    <BothLeaguesContainer>
      <LeagueContainer>
        {leagueOneData?.standings?.results?.length < 1 && `FPL haven't released the table info yet, checkback on GW1.`}
        {leagueOneData?.standings?.results?.length > 0 && (
          <Table
            columns={leagueColumns}
            data={leagueOneData.standings.results}
            tableClassName="league-table"
            theadClassName="league-thead"
            thClassName="league-th"
            tbodyClassName="league-tbody"
            trClassName="league-tr"
            tdClassName="league-td"
          />
        )}
      </LeagueContainer>
      {/* <LeagueContainer>
        {leagueTwoData?.standings?.results && (
          <Table
            columns={leagueColumns}
            data={leagueTwoData.standings.results}
            tableClassName="league-table"
            theadClassName="league-thead"
            thClassName="league-th"
            tbodyClassName="league-tbody"
            trClassName="league-tr"
            tdClassName="league-td"
          />
        )}
      </LeagueContainer> */}
    </BothLeaguesContainer>
  );
};
