'use strict';

import { Router } from 'express';
const router = Router();

import {
  getLiveGameweek,
  getAllGameweekInfo,
  getLeagueFixtures,
  getLeagueStandings,
  getTeamPicksForGameweek,
} from './controller.js';

router.get('/event/current', getAllGameweekInfo);
router.get('/event/:eventId/live/', getLiveGameweek);
router.get('/:leagueId/standings', getLeagueStandings);
router.get('/:leagueId/fixtures/:gameweek', getLeagueFixtures);
router.get('/team/:playerId/event/:eventId/picks/', getTeamPicksForGameweek);

export { router };
