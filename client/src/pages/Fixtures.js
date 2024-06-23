import React, { useState, useEffect, useRef } from 'react';
import Table from '../ui/Table';
import styled from 'styled-components';
import { device } from '../breakpoints';
import { fetchFantasyFixtures } from '../api/requests';
import { calculateLivePoints } from '../utils/livePointsUtil';

import { GameweekSelector } from '../ui/GameweekSelector';
import { fetchPremFixtures } from '../api/requests';
import { isPastThreeHoursLater } from '../utils/timeCheckers';
import { FancyLoadingCircle } from '../ui/FancyLoadingCircle';
import { TeamAndManagerName } from '../ui/TableComponents/TeamAndManagerName';
// import { ScreenshotButton } from '../utils/ScreenshotButton';
import TeamForm from '../ui/TableComponents/TeamForm';
import { FixturePoints } from '../ui/TableComponents/FixturePoints';
import useInnerWidth from '../utils/InnerWidth';
import { FixtureAwards } from '../ui/TableComponents/FixtureAwards';

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
    font-size: 0.75rem;
    margin: 0;
  }
  @media ${device.md} {
    margin-right: auto;
    flex-wrap: wrap;
    gap: 0.5rem;
    p {
      font-size: 0.6rem;
    }
  }
`

const EmojiPairWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  p.emoji {
    font-size: 1.4rem;
  }
  @media ${device.md} {
    p.emoji {
      font-size: 1rem;
    }
  }
`

export const Fixtures = ({ gameweekNumber, gameweekContextData }) => {
  const [loading, setLoading] = useState(false)
  const [badgersFixtureData, setBadgersFixtureData] = useState(null)
  const [screwfixFixtureData, setScrewfixFixtureData] = useState(null)
  const [gameweekToView, setGameweekToView] = useState(gameweekNumber)
  const [allGamesFinished, setAllGamesFinished] = useState(false)
  const [firstGameStarted, setFirstGameStarted] = useState(false)
  const [finishedCheckComplete, setFinishedCheckComplete] = useState(false)
  const innerWidth = useInnerWidth();
  const viewingThisGameweek = gameweekToView === gameweekNumber

  useEffect(() => {
    if (gameweekToView) {
      fetchPremFixturesData();
      if (finishedCheckComplete) {
        fetchFantasyFixturesData();
      }
    }
  }, [gameweekToView, finishedCheckComplete]);

  const fetchPremFixturesData = async () => {
    try {
      const realFixtures = await fetchPremFixtures(gameweekNumber)
      if (realFixtures && realFixtures.length > 0) {
        setFirstGameStarted(realFixtures[0].started)
        const finalFixture = realFixtures[realFixtures.length - 1]
        const finalGameDateTime = finalFixture.kickoff_time
        const shouldBeUpdated = isPastThreeHoursLater(finalGameDateTime)
        shouldBeUpdated
          ? setAllGamesFinished(true)
          : setAllGamesFinished(false)
        setFinishedCheckComplete(true)
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  const fetchFantasyFixturesData = async () => {
    try {
      const screwfixId = 589414
      const badgersId = 728798
      const screwFixFixtures = await fetchFantasyFixtures(screwfixId, gameweekToView);
      const badgersFixtures = await fetchFantasyFixtures(badgersId, gameweekToView);
      if (gameweekToView === gameweekNumber && firstGameStarted && finishedCheckComplete && !allGamesFinished) {
        setLoading(true)
        const livePointsScrewfix = await calculateLivePoints(screwFixFixtures.results)
        setScrewfixFixtureData(livePointsScrewfix);

        const livePointsBadgers = await calculateLivePoints(badgersFixtures.results)
        setBadgersFixtureData(livePointsBadgers);
        setLoading(false)
        return
      }
      if (screwFixFixtures) {
        setScrewfixFixtureData(screwFixFixtures.results);
      }
      if (badgersFixtures) {
        setBadgersFixtureData(badgersFixtures.results);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  const contentRef = useRef(null);

  const renderEndColumn = (row, isHome) => {
    if (firstGameStarted || !viewingThisGameweek) {
      return (
        <FixtureAwards rowInfo={row} isHome={isHome} />
      )
    }
    if (innerWidth < 600) {
      const { entry_1_entry, entry_2_entry } = row.row.original
      return (
        <TeamForm
          teamId={isHome ? entry_1_entry : entry_2_entry}
          leagueId={row.row.original.league}
          isHome={isHome}
          gameweekContextData={gameweekContextData}
        />
      )
    }
  }

  const fixtureColumns = [
    {
      Header: 'Emoji',
      accessor: 'emoji_1',
      Cell: (row) => renderEndColumn(row, true),
      width: '10%',
    },
    {
      Header: 'Home',
      accessor: (row) => <TeamAndManagerName
        rowInfo={row}
        fixturesTable={true}
        isHome={true}
        gameweekToView={gameweekToView}
        gameweekContextData={gameweekContextData}
      />,
      width: '35%',
    },
    {
      Header: '',
      accessor: 'entry_1_points',
      Cell: (row) => <FixturePoints row={row} isHome={true} />,
      width: '5%',
    },
    {
      Header: '',
      accessor: 'entry_2_points',
      Cell: (row) => <FixturePoints row={row} isHome={false} />,
      width: '5%',
    },
    {
      Header: 'Away',
      accessor: (row) => <TeamAndManagerName
        rowInfo={row}
        fixturesTable={true}
        isHome={false}
        gameweekToView={gameweekToView}
        gameweekContextData={gameweekContextData}
      />,
      width: '35%',
    },
    {
      Header: 'Emoji2',
      accessor: 'emoji_2',
      Cell: (row) => renderEndColumn(row, false),
    },
  ];

  const emojiKeys = [
    ['⚽️ ', 'winner'],
    ['🐐 ', `week's GOAT`],
    ['😭 ', `week's worst`],
    ['🔥 ', '> 90 pts'],
    ['😳 ', '< 40 pts'],
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
          {emojiKeys.map((emojiPair, index) => {
            return <EmojiPairWrap key={index}>
              <div><p className="emoji">{emojiPair[0]}</p></div>
              <div><p>{emojiPair[1]}</p></div>
            </EmojiPairWrap>
          })}
        </EmojiKeyWrap>
      </TopbarWrap>
      {loading
        ? <FancyLoadingCircle />
        : <BothFixturescontainer ref={contentRef}>
          {badgersFixtureData && badgersFixtureData.length !== 0 && (
            <FixturesContainer>
              <Table
                columns={fixtureColumns}
                data={badgersFixtureData}
                tableClassName="fixture-table"
                theadClassName="fixture-thead"
                thClassName="fixture-th"
                tbodyClassName="fixture-tbody"
                trClassName="fixture-tr"
                tdClassName="fixture-td"
                gameweekContextData={gameweekContextData}
              />
            </FixturesContainer>
          )}
          {screwfixFixtureData && screwfixFixtureData.length !== 0 && (
            <FixturesContainer>
              <Table
                columns={fixtureColumns}
                data={screwfixFixtureData}
                tableClassName="fixture-table"
                theadClassName="fixture-thead"
                thClassName="fixture-th"
                tbodyClassName="fixture-tbody"
                trClassName="fixture-tr"
                tdClassName="fixture-td"
                gameweekContextData={gameweekContextData}
              />
            </FixturesContainer>
          )}
        </BothFixturescontainer>
      }
    </>
  );
};
