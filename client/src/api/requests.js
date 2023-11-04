const serverUrl = process.env.REACT_APP_SERVER_URL; // update with your server's URL

export const getAllGameweekInfo = async () => {
  try {
    const response = await fetch(`${serverUrl}/event/current`);

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
    const response = await fetch(`${serverUrl}/event/current/players`);

    const data = await response.json();
    console.log('playerNames ', data)
    // Process the data as needed
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export const fetchLeagueStandings = async (leagueId) => {
  try {
    const response = await fetch(`${serverUrl}/${leagueId}/standings`);

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

export const fetchFixtures = async (leagueId, gameweek) => {
  try {
    const response = await fetch(
      `${serverUrl}/${leagueId}/fixtures/${gameweek}`
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

export const fetchLivePlayerScores = async (gameweekNumber) => {
  try {
    const response = await fetch(`${serverUrl}/event/${gameweekNumber}/live`);

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
      `${serverUrl}/team/${managerId}/event/${gameweekNumber}/picks`
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
