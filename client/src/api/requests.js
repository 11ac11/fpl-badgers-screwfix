const serverUrl = process.env.REACT_APP_SERVER_URL; // update with your server's URL

const proxyUrl = 'https://corsproxy.io/?';
// const proxyUrl = 'https://cors-proxy.htmldriven.com/?url=';
const targetUrl = 'https://fantasy.premierleague.com/api/';
const encodedUrl = proxyUrl + encodeURIComponent(targetUrl);

export const getAllGameweekInfo = async () => {
  try {
    const response = await fetch(`${encodedUrl}/bootstrap-static/`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    // Process the data as needed
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export const getPlayerNames = async () => {
  try {
    const response = await fetch(`${encodedUrl}/event/current/players/`);

    const data = await response.json();
    console.log('playerNames ', data)
    // Process the data as needed
    setTimeout(() => {
      return data;
    }, 300);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export const fetchLeagueStandings = async (leagueId, gameweekNumber) => {
  try {
    const response = await fetch(`${encodedUrl}/leagues-h2h/${leagueId}/standings/?page_new_entries=1&page_standings=1`);
    // THESE PARAMS ARE NOT CORRECTLY FETCHING; TRYING TO FETCH ALL DATA
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status} `);
    }


    const data = await response.json();
    console.log('OIII', data)
    // Process the data as needed
    return data;
  } catch (error) {
    console.error(`Error: ${error.message} `);
    throw error;
  }
};

export const fetchFixtures = async (leagueId, gameweek) => {
  try {
    const response = await fetch(`${encodedUrl}/leagues-h2h-matches/league/${leagueId}/?page=1&event=38`);

    console.log(response)

    // if (!response.status === 404) {
    //   return 'League ID is wrong or it is end of the season'
    // }

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status} `);
    }

    const data = await response.json();
    // Process the data as needed
    setTimeout(() => {
      return data;
    }, 300);
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
    // Process the data as needed
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
    // Process the data as needed
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export const fetchRealFixtures = async (gameweekNumber) => {
  try {
    const response = await fetch(
      `${encodedUrl}realfixtures/${gameweekNumber}`
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    // Process the data as needed
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};