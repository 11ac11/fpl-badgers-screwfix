'use strict';

import fetch from 'node-fetch';

const fplApiBaseString = 'https://fantasy.premierleague.com/api';

export const getAllGameweekInfo = async (req, res) => {
  const url = `${fplApiBaseString}/bootstrap-static/`;

  try {
    const response = await fetch(url);
    // Check if the response status is OK (status code 200)
    if (response.ok) {
      // Parse the JSON only if the response has content
      const data = await response.json();
      // console.log(data);
      res.json(data.events);
    } else {
      // Handle non-OK response status here
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    // Handle any other errors that might occur during the process
    console.error('Error:', error.message);
  }
}

export const getLiveGameweek = async (req, res) => {
  const event_id = req.params.eventId;
  const url = `${fplApiBaseString}/event/${event_id}/live/`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const getLeagueStandings = async (req, res) => {
  const league_id = req.params.leagueId;
  const url = `${fplApiBaseString}/leagues-h2h/${league_id}/standings`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const getLeagueFixtures = async (req, res) => {
  const league_id = req.params.leagueId;
  const gameweek = req.params.gameweek;
  const url = `${fplApiBaseString}/leagues-h2h-matches/league/${league_id}?page=1&event=${gameweek}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

// export const getTeamPicksForGameweek = async (req, res) => {
//   const playerId = req.params.playerId;
//   const eventId = req.params.eventId;
//   const url = `${fplApiBaseString}/entry/${playerId}/event/${eventId}/picks/`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred' });
//   }
// };

// export const getPlayerNames = async (req, res) => {
//   const url = `${fplApiBaseString}/bootstrap-static/`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     const players = data.elements
//     const customObject = players.map((player) => {
//       return {
//         id: player.id,
//         web_name: player.web_name
//       };
//     });

//     res.json(customObject);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred' });
//   }
// };

export const getCustomPlayerList = async (req, res) => {
  const player_id = req.params.playerId;
  const event_id = req.params.eventId;
  const picksUrl = `${fplApiBaseString}/entry/${player_id}/event/${event_id}/picks/`;
  const playerInfoUrl = `${fplApiBaseString}/bootstrap-static/`;
  const liveUrl = `${fplApiBaseString}/event/${event_id}/live/`;


  try {
    const picksResponse = await fetch(picksUrl)
    const picksData = await picksResponse.json()
    const picks = picksData.picks

    const playerInfoResponse = await fetch(playerInfoUrl)
    const playerData = await playerInfoResponse.json()
    const players = playerData.elements

    const refinedPlayerObject = players.map((player) => {
      return {
        id: player.id,
        web_name: player.web_name
      };
    });

    const liveResponse = await fetch(liveUrl)
    const liveData = await liveResponse.json()
    const livePoints = liveData.elements

    const mergeObjectsById = (array1, array2, array3) => {
      const mergedArray = array1.map(obj1 => {
        const matchingObj2 = array2.find(obj2 => obj2.element === obj1.id);
        const matchingObj3 = array3.find(obj3 => obj3.id === obj1.id);

        if (matchingObj2 && matchingObj3) {
          // Merge the objects from array2 and array3, excluding the 'element' property
          const { element, ...mergedObject } = { ...obj1, ...matchingObj2 };
          // Include the 'stats' property from array3
          mergedObject.stats = matchingObj3.stats;
          return mergedObject;
        }
        // If there is no match in either array2 or array3, return null
        return null;
      }).filter(Boolean); // Filter out the null values (no match)

      // Sort the mergedArray by the 'position' property in ascending order
      return mergedArray.sort((a, b) => a.position - b.position);
    }

    const picksLivePoints = mergeObjectsById(refinedPlayerObject, picks, livePoints)
    const updatedFixtureInfo = { ...picksData, picks: picksLivePoints }

    res.json(updatedFixtureInfo);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

export const getRealFixtures = async (req, res) => {
  const gameweek = req.params.gameweekNumber;
  const url = `${fplApiBaseString}/fixtures/?event=${gameweek}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
