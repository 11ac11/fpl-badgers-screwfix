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
  @media ${device.lg} {
    flex-direction: column;
    align-items: center;
  }
`;

const FixturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  @media ${device.lg} {
    width: 100%;
  }
`;

const TopbarWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 2rem;
  @media ${device.md} {
    flex-direction: column;
    gap: 1rem;
  }
`

const SelectorWrap = styled.div`
  width: 30%;
  @media ${device.lg} {
    width: 25%;
  }
  @media ${device.md} {
    width: 50%;
  }
  @media ${device.sm} {
    width: 100%;
  }
`;

const EmojiKeyWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
  p {
    font-family: JetBrains Mono;
    font-size: 0.6rem;
    margin: 0;
  }
  @media ${device.md} {
    margin-right: auto;
  }
`

const EmojiPairWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  p.emoji {
    font-size: 1.4rem;
  }
`

export const Fixtures = ({ gameweekNumber }) => {
  const [badgersTableData, setBadgersTableData] = useState(null)
  const [screwfixTableData, setScrewfixTableData] = useState(null)
  const [gameweekToView, setGameweekToView] = useState(gameweekNumber)

  useEffect(() => {
    console.log('hitting gameweekToView')
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

  const emojiKeys = [
    ['⚽️ ', 'winner'],
    ['🐐 ', `week's GOAT`],
    ['😭 ', `week's worst`],
    ['🔥 ', 'over 90 points'],
    ['😳 ', 'under 40 points'],
    ['🤝 ', 'closest game']
  ]


  return (
    <>
    <TopbarWrap>
      <SelectorWrap>
        <GameweekSelector
          gameweekNumber={gameweekNumber}
          gameweekToView={gameweekToView}
          setGameweekToView={setGameweekToView}
          />
      </SelectorWrap>
      <EmojiKeyWrap>
      { emojiKeys.map((emojiPair) => {
        return <EmojiPairWrap>
          <div><p className="emoji">{emojiPair[0]}</p></div>
          <div><p>{emojiPair[1]}</p></div>
        </EmojiPairWrap>
      })}
      </EmojiKeyWrap>
    </TopbarWrap>
      {  screwfixTableData && badgersTableData && (
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
      )}
    </>
  );
};
