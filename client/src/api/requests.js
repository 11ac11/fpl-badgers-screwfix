const serverUrl = process.env.REACT_APP_SERVER_URL; // update with your server's URL

const proxyUrl = 'https://corsproxy.io/?';
const targetUrl = 'https://fantasy.premierleague.com/api/';
const encodedUrl = proxyUrl + encodeURIComponent(targetUrl);

export const getAllGameweekInfo = async () => {
  try {
    const response = await fetch(`${encodedUrl}/bootstrap-static/`')

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// export const getPlayerNames = async () => {
//   try {
//     const response = await fetch(`${encodedUrl}/event/current/players/`);

//     const data = await response.json();
//     console.log('playerNames ', data)
//     return data;
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     throw error;
//   }
// };

export const fetchLeagueStandings = async (leagueId, gameweekNumber) => {
  try {
    const response = await fetch(`${encodedUrl}/leagues-h2h/${leagueId}/standings/?page_new_entries=1&page_standings=1`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status} `);
    }


    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error.message} `);
    throw error;
  }
};

export const fetchFantasyFixtures = async (leagueId, gameweek) => {
  try {
    const response = await fetch(`${encodedUrl}/leagues-h2h-matches/league/${leagueId}/?page=1&event=${gameweek}`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    return data
  } catch (error) {
    console.error(`Error: ${error.message} `);
    throw error;
  }
};

export const fetchLivePlayerScores = async (gameweekNumber) => {
  try {
    const response = await fetch(`${encodedUrl}event/${gameweekNumber}/live/`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export const fetchManagerPicksByEvent = async (managerId, gameweekNumber) => {
  try {
    const response = await fetch(
      `${encodedUrl}team/${managerId}/event/${gameweekNumber}/picks/`
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export const fetchPremFixtures = async (gameweekNumber) => {
  try {
    const response = await fetch(
      `${encodedUrl}/fixtures/?event=${gameweekNumber}`
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};