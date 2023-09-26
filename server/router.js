'use strict';

import { Router } from 'express';
const router = Router();

import {
  getLiveGameweek,
  getCurrentGameweekNumber,
  getLeagueFixtures,
  getLeagueStandings,
  getTeamPicksForGameweek,
} from './controller.js';

router.get('/event/current', getCurrentGameweekNumber);
router.get('/event/:eventId/live/', getLiveGameweek);
router.get('/:leagueId/standings', getLeagueStandings);
router.get('/screwfix/fixtures', getLeagueFixtures);
router.get('/team/:playerId/event/:eventId/picks/', getTeamPicksForGameweek);

export { router };
