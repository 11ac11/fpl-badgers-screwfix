import React, { useEffect, useState } from 'react';
import Table from '../ui/Table';
import styled from 'styled-components';
import { leagueColumns } from '../tableUtils';
import { fetchLeagueStandings } from '../api/requests';
import { device } from '../breakpoints';

const screwfixId = 589414;
const badgersId = 728798;

const BothLeaguesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  @media ${device.md} {
    flex-direction: column;
    align-items: center;
  }
`;

const LeagueContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  @media ${device.md} {
    width: 100%;
  }
`;

export const Tables = () => {
  const [leagueOneData, setLeagueOneData] = useState(null);
  const [leagueTwoData, setLeagueTwoData] = useState(null);

  useEffect(() => {
    const fetchScrewfixStandings = async () => {
      try {
        const screwfixData = await fetchLeagueStandings(screwfixId);
        setLeagueTwoData(screwfixData);
        // console.log('SF league data: ', screwfixData);
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    };

    const fetchBadgersStandings = async () => {
      try {
        const badgersData = await fetchLeagueStandings(badgersId);
        if (badgersData) {
          setLeagueOneData(badgersData);
        }
        // console.log('B league data: ', badgersData);
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    };

    fetchScrewfixStandings();
    fetchBadgersStandings();
  }, []);

  return (
    <BothLeaguesContainer>
      <LeagueContainer>
        {/* <Image src={badgersDiv1Image} alt="Badgers divison one" width="20%" /> */}
        {leagueOneData?.standings?.results && (
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
      <LeagueContainer>
        {/* <Image src={screwfixDiv2Image} alt="Screwfix divison two" width="20%" /> */}
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
      </LeagueContainer>
    </BothLeaguesContainer>
  );
};
