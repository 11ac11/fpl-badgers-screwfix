const serverUrl = process.env.REACT_APP_SERVER_URL; // update with your server's URL

// const proxyUrl = 'https://api.allorigins.win/get?url=';
// const proxyUrl = 'https://crossorigin.me/';
const proxyUrl = 'https://corsproxy.io/?';
// const proxyUrl = 'https://proxy.cors.sh/';
// const proxyUrl = 'https://cors.now.sh/';
// const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';
// const proxyUrl = 'https://cors-buster.vercel.app/?href=';
const targetUrl = 'https://fantasy.premierleague.com/api/';
const encodedUrl = proxyUrl + targetUrl;
const noCache = `?nocache=${Date.now()}`

export const getAllGameweekInfo = async () => {
  try {
    // const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://fantasy.premierleague.com/api/bootstrap-static/')}`)
    const response = await fetch(`${encodedUrl}bootstrap-static/${noCache}`)
    // headers: { 'x-cors-api-key': 'temp_d30690954ee0284086917763ef226e01' }

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    console.log(response)

    const data = await response.json();
    console.log('this', data)
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
    const response = await fetch(`${encodedUrl}/leagues-h2h/${leagueId}/standings/?page_new_entries=1&page_standings=1/${noCache}`);
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
    const response = await fetch(`${encodedUrl}/leagues-h2h-matches/league/${leagueId}/?page=1&event=${gameweek}/${noCache}`);

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
    const response = await fetch(`${encodedUrl}event/${gameweekNumber}/live/${noCache}`);

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
      `${encodedUrl}team/${managerId}/event/${gameweekNumber}/picks/${noCache}`
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
      `${encodedUrl}/fixtures/?event=${gameweekNumber}/${noCache}`
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