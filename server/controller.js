'use strict';

import fetch from 'node-fetch';

const fplApiBaseString = 'https://fantasy.premierleague.com/api';

export const getAllGameweekInfo = async (req, res) => {
  const url = `${fplApiBaseString}/bootstrap-static/`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.events);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

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

export const getTeamPicksForGameweek = async (req, res) => {
  //console.log(req.params);
  const playerId = req.params.playerId;
  const eventId = req.params.eventId;
  const url = `${fplApiBaseString}/entry/${playerId}/event/${eventId}/picks/`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
