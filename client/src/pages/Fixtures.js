import React, { useState, useEffect, useMemo, useRef } from 'react';
import Table from '../ui/Table';
import styled from 'styled-components';
import { device } from '../breakpoints';
import { fetchFixtures } from '../api/requests';

import { fixtureColumns } from '../tableUtils';
import { GameweekSelector } from '../ui/GameweekSelector';
// import { ScreenshotButton } from '../utils/ScreenshotButton';

const BothFixturescontainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  @media ${device.md} {
    flex-direction: column;
    align-items: center;
  }
`;

const FixturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  @media ${device.md} {
    width: 100%;
  }
`;

const SelectorWrap = styled.div`
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
  @media ${device.md} {
    width: 100%;
  }
`;

export const Fixtures = ({ gameweekNumber }) => {
  const [badgersTableData, setBadgersTableData] = useState(null)
  const [screwfixTableData, setScrewfixTableData] = useState(null)
  const [gameweekToView, setGameweekToView] = useState(gameweekNumber)

  useEffect(() => {
    if (gameweekToView) {
      fetchFixturesData();
    }
  }, [gameweekToView]);


  const fetchFixturesData = async () => {
    try {
      const screwfixId = 589414
      const badgersId = 728798
      const screwFixFixtures = await fetchFixtures(screwfixId, gameweekToView);
      const badgersFixtures = await fetchFixtures(badgersId, gameweekToView);
      if (screwFixFixtures) {
        setScrewfixTableData(screwFixFixtures.results);
      }
      if (badgersFixtures) {
        setBadgersTableData(badgersFixtures.results);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  const contentRef = useRef(null);

  return (
    screwfixTableData && badgersTableData && (
      <>
        <SelectorWrap>
          <GameweekSelector
            gameweekNumber={gameweekNumber}
            gameweekToView={gameweekToView}
            setGameweekToView={setGameweekToView}
          />
        </SelectorWrap>
        <BothFixturescontainer ref={contentRef}>
          {badgersTableData && badgersTableData.length !== 0 && (
            <FixturesContainer>
              <Table
                columns={fixtureColumns}
                data={badgersTableData}
                tableClassName="fixture-table"
                theadClassName="fixture-thead"
                thClassName="fixture-th"
                tbodyClassName="fixture-tbody"
                trClassName="fixture-tr"
                tdClassName="fixture-td"
              />
            </FixturesContainer>
          )}
          {screwfixTableData && screwfixTableData.length !== 0 && (
            <FixturesContainer>
              <Table
                columns={fixtureColumns}
                data={screwfixTableData}
                tableClassName="fixture-table"
                theadClassName="fixture-thead"
                thClassName="fixture-th"
                tbodyClassName="fixture-tbody"
                trClassName="fixture-tr"
                tdClassName="fixture-td"
              />
            </FixturesContainer>
          )}
        </BothFixturescontainer>
      </>)
  );
};
