import React, { useState, useEffect, useMemo, useRef } from 'react';
import Table from '../ui/Table';
import styled from 'styled-components';
import { device } from '../breakpoints';

import { fixtureColumns } from '../tableUtils';
import { ScreenshotButton } from '../utils/ScreenshotButton';

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

export const Fixtures = ({ screwfixFix, badgersFix }) => {
  const [badgersTableData, setBadgersTableData] = useState(null)
  const [screwfixTableData, setScrewfixTableData] = useState(null)
  console.log('fixtures', screwfixFix);
  useEffect(() => {
    setBadgersTableData(badgersFix?.results)
    setScrewfixTableData(screwfixFix?.results)
    console.log(badgersTableData)
  }, [badgersFix, screwfixFix])

  const contentRef = useRef(null);

  return (
    <ScreenshotButton contentRef={contentRef}>
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
        {screwfixFix?.results && (
          <FixturesContainer>
            <Table
              columns={fixtureColumns}
              data={screwfixFix?.results}
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
    </ScreenshotButton>
  );
};
