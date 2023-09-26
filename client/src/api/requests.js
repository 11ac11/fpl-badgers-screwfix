const serverUrl = 'http://localhost:3001'; // Update with your server's URL

export const fetchTeam = async (managerId = 1034149) => {
  try {
    const response = await fetch(`${serverUrl}/`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    // Process the data as needed
    console.log('oi', data);
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

export const fetchFixtures = async (leagueId) => {
  try {
    const response = await fetch(`${serverUrl}/${leagueId}/fixtures`);

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
    const response = await fetch(`${serverUrl}/event/${gameweekNumber}/live/`);

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
      `${serverUrl}/team/${managerId}/event/${gameweekNumber}/picks/`
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
