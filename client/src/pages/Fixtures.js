import React, { useState, useEffect, useRef, useContext } from 'react';
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
import TeamForm from '../ui/TableComponents/TeamForm';
import { FixturePoints } from '../ui/TableComponents/FixturePoints';
import { FixtureAwards } from '../ui/TableComponents/FixtureAwards';
import useInnerWidth from '../utils/InnerWidth';
import { BadgersContext } from '../state/BadgersContextProvider';

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
  width: 100%;
  // @media ${device.lg} {
  //   width: 100%;
  // }
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
    font-size: 0.7rem;
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

export const Fixtures = ({ gameweekNumber }) => {
  const { badgersData } = useContext(BadgersContext);

  const [loading, setLoading] = useState(false)
  const [badgersFixtureData, setBadgersFixtureData] = useState(null)
  // const [screwfixFixtureData, setScrewfixFixtureData] = useState(null)
  const [gameweekToView, setGameweekToView] = useState(gameweekNumber)
  const [allGamesFinished, setAllGamesFinished] = useState(false)
  const [firstGameStarted, setFirstGameStarted] = useState(false)
  const [finishedCheckComplete, setFinishedCheckComplete] = useState(false)
  const [fixturesNotAvaliable, setFixturesNotAvaliable] = useState(false)
  const innerWidth = useInnerWidth();
  const contentRef = useRef(null);

  useEffect(() => {
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
        const newBadgersId = 1115273;
        // const screwFixFixtures = await fetchFantasyFixtures(screwfixId, gameweekToView);
        const badgersFixtures = await fetchFantasyFixtures(newBadgersId, gameweekToView);
        if (gameweekToView === gameweekNumber && firstGameStarted && finishedCheckComplete && !allGamesFinished) {
          setLoading(true)
          // const livePointsScrewfix = await calculateLivePoints(screwFixFixtures.results)
          // setScrewfixFixtureData(livePointsScrewfix);

          const livePointsBadgers = await calculateLivePoints(badgersFixtures.results)
          setBadgersFixtureData(livePointsBadgers);
          setLoading(false)
          return
        }
        // if (screwFixFixtures) {
        //   setScrewfixFixtureData(screwFixFixtures.results);
        // }
        if (badgersFixtures) {
          setBadgersFixtureData(badgersFixtures.results);
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    };

    if (gameweekToView) {
      if (gameweekToView === 'pre-season') {
        setFixturesNotAvaliable(true)
        return
      }
      fetchPremFixturesData();
      if (finishedCheckComplete) {
        fetchFantasyFixturesData();
      }
    }
  }, [gameweekToView, finishedCheckComplete, allGamesFinished, firstGameStarted, gameweekNumber]);

  const renderEndColumn = (row, isHome) => {
    if (firstGameStarted && gameweekToView <= gameweekNumber) {
      return (
        <FixtureAwards rowInfo={row} isHome={isHome} />
      )
    }
    if (allGamesFinished && gameweekToView === gameweekNumber + 1 && innerWidth > 600) {
      const { entry_1_entry, entry_2_entry } = row.row.original
      return (
        <TeamForm
          teamId={isHome ? entry_1_entry : entry_2_entry}
          leagueId={row.row.original.league}
          isHome={isHome}
          badgersData={badgersData}
        />
      )
    }
  }

  const fixtureColumns = [
    {
      Header: 'Emoji',
      accessor: 'emoji_1',
      Cell: (row) => renderEndColumn(row, true),
    },
    {
      Header: 'Home',
      accessor: (row) => <TeamAndManagerName
        rowInfo={row}
        fixturesTable={true}
        isHome={true}
        gameweekToView={gameweekToView}
        badgersData={badgersData}
        allGamesFinished={allGamesFinished}
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
        badgersData={badgersData}
        allGamesFinished={allGamesFinished}
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
    ['🐐 ', `GOAT`],
    ['😭 ', `worst`],
    ['🔥 ', '> 90'],
    ['😳 ', '< 40'],
    ['🤝 ', 'tightest']
  ]

  const selectorProps = { gameweekNumber, gameweekToView, setGameweekToView }

  const commonFixtureProps = {
    columns: fixtureColumns,
    tableClassName: "fixture-table",
    theadClassName: "fixture-thead",
    thClassName: "fixture-th",
    tbodyClassName: "fixture-tbody",
    trClassName: "fixture-tr",
    tdClassName: "fixture-td",
  }

  const badgersFixturesProps = {
    ...commonFixtureProps,
    data: badgersFixtureData,
    badgersData: badgersData
  }

  // const screwfixFixturesProps = {
  //   ...commonFixtureProps,
  //   data: screwfixFixtureData,
  //   badgersData: badgersData
  // }

  return (
    <>
      <TopbarWrap>
        <SelectorWrap>
          <GameweekSelector {...selectorProps} />
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
        : (
          <BothFixturescontainer ref={contentRef}>
            {fixturesNotAvaliable && `FPL haven't released the fixtures yet, check back on GW1.`}
            {badgersFixtureData && badgersFixtureData.length !== 0 && (
              <FixturesContainer>
                <Table {...badgersFixturesProps} />
              </FixturesContainer>
            )}
            {/* {screwfixFixtureData && screwfixFixtureData.length !== 0 && (
            <FixturesContainer>
              <Table { ...screwfixFixturesProps } />
            </FixturesContainer>
          )} */}
          </BothFixturescontainer>
        )
      }
    </>
  );
};
