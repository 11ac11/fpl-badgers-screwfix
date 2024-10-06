import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { device } from '../breakpoints';
import { fetchFantasyFixtures, fetchPremFixtures } from '../api/requests';
import { FancyLoadingCircle, GameweekSelector, Table } from '../ui';
import { TeamForm, TeamAndManagerName, FixturePoints, FixtureAwards } from '../ui/TableComponents';
import useInnerWidth from '../utils/InnerWidth';
import { calculateLivePoints } from '../utils/livePointsUtil';
import { getFirstAndLastKickOffsForEachDay, isWithinTodaysKickOffs } from '../utils/timeCheckers';
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
`

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
`

const EmojiLegendWrap = styled.div`
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
  const { previewNextGw, leagueId, livePlayerPointsData } = badgersData

  const [loading, setLoading] = useState(false)
  const [premFixtures, setPremFixtures] = useState([])
  const [badgersFixtureData, setBadgersFixtureData] = useState(null)
  // const [screwfixFixtureData, setScrewfixFixtureData] = useState(null)
  const [gameweekToView, setGameweekToView] = useState(previewNextGw ? (gameweekNumber + 1) : gameweekNumber)
  const [allGamesFinished, setAllGamesFinished] = useState(false)
  const [firstGameStarted, setFirstGameStarted] = useState(false)
  const [fixturesNotAvaliable, setFixturesNotAvaliable] = useState(false)
  const [useCustomScoringFunction, setUseCustomScoringFunction] = useState(false)

  const innerWidth = useInnerWidth();
  const contentRef = useRef(null);

  const livePlayerPointsReady = badgersData.livePlayerPointsData.length > 0
  const viewingCurrentGameweek = gameweekToView === gameweekNumber
  const useCustomScoring = viewingCurrentGameweek && useCustomScoringFunction

  useEffect(() => {
    const fetchPremFixturesData = async () => {
      try {
        const premFixtures = await fetchPremFixtures(gameweekNumber)
        setPremFixtures(premFixtures)
      } catch (error) {
        console.error(`Error fetching PL fixtures data: ${error.message}`);
      }
    }

    if (gameweekToView) {
      setLoading(true)
      if (gameweekToView === 'pre-season') {
        setFixturesNotAvaliable(true)
        setLoading(false)
        return
      } else {
        fetchPremFixturesData();
      }
    }
  }, [gameweekToView, gameweekNumber]);

  useEffect(() => {
    if (premFixtures && premFixtures.length > 0) {
      const today = new Date(Date.now()).toLocaleDateString()

      // check to see if first game of gameweek has kicked off
      const gameweekFirstGameStarted = premFixtures[0].started
      setFirstGameStarted(gameweekFirstGameStarted)

      // check to see if all games have finished
      const allGamesFinished = premFixtures.every(fixture => !!fixture.finished)
      setAllGamesFinished(allGamesFinished)

      // get fixtures by date, in order to adapt when using custom function over each day
      const fixturesByDate = getFirstAndLastKickOffsForEachDay(premFixtures)
      const shouldUseLiveMode = isWithinTodaysKickOffs(today, fixturesByDate)
      setUseCustomScoringFunction(shouldUseLiveMode)
    }
  }, [premFixtures]);

  useEffect(() => {
    const fetchFantasyFixturesData = async () => {
      try {
        // const screwFixFixtures = await fetchFantasyFixtures(screwfixId, gameweekToView);
        const badgersFixtures = await fetchFantasyFixtures(leagueId, gameweekToView);
        const resultsFromApi = badgersFixtures?.results
        if (useCustomScoring) {
          // const livePointsScrewfix = await calculateLivePoints(screwFixFixtures.resultsFromApi)
          // setScrewfixFixtureData(livePointsScrewfix);

          const livePointsBadgers = await calculateLivePoints(resultsFromApi, livePlayerPointsData)
          setBadgersFixtureData(livePointsBadgers);
          return
        }
        // if (screwFixFixtures) {
        //   setScrewfixFixtureData(screwFixFixtures.resultsFromApi);
        // }
        if (badgersFixtures) {
          setBadgersFixtureData(resultsFromApi);
        }
      } catch (error) {
        console.error(`Error fetching fantasy fixtures data: ${error.message}`);
      }
    };

    console.log('livePlayerPointsReady:', livePlayerPointsReady)
    console.log('useCustomScoring:', useCustomScoring)
    if (livePlayerPointsReady) {
      fetchFantasyFixturesData();
    }
  }, [useCustomScoring, gameweekToView, leagueId, livePlayerPointsData, livePlayerPointsReady])

  useEffect(() => {
    if (!!badgersFixtureData && livePlayerPointsReady) setLoading(false)
  }, [badgersFixtureData, livePlayerPointsReady])


  const renderEndColumn = (row, isHome, allGamesFinished) => {
    if (firstGameStarted && gameweekToView <= gameweekNumber) {
      return (
        <FixtureAwards rowInfo={row} isHome={isHome} allGamesFinished={allGamesFinished} viewingCurrentGameweek={viewingCurrentGameweek} />
      )
    }
    if ((previewNextGw || (allGamesFinished && gameweekToView === gameweekNumber + 1)) && innerWidth > 600) {
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
      Cell: (row) => renderEndColumn(row, true, allGamesFinished),
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
      Cell: (row) => renderEndColumn(row, false, allGamesFinished),
    },
  ];

  const emojiLegend = [
    // ['⚽️ ', 'winner'],
    ['🐐 ', `GOAT`],
    ['😭 ', `worst`],
    ['🔥 ', '> 90'],
    ['😳 ', '< 40'],
    ['🤝 ', 'tightest']
  ]

  const selectorProps = { gameweekNumber: previewNextGw ? gameweekNumber + 1 : gameweekNumber, gameweekToView, setGameweekToView }

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
        <EmojiLegendWrap>
          {emojiLegend.map((emojiPair, index) => {
            return <EmojiPairWrap key={index}>
              <div><p className="emoji">{emojiPair[0]}</p></div>
              <div><p>{emojiPair[1]}</p></div>
            </EmojiPairWrap>
          })}
        </EmojiLegendWrap>
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
