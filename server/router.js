'use strict';

import { Router } from 'express';
const router = Router();

import {
  getLiveGameweek,
  getAllGameweekInfo,
  getLeagueFixtures,
  getLeagueStandings,
  getCustomPlayerList
} from './controller.js';

router.get('/event/current', getAllGameweekInfo);
// router.get('/event/current/players', getPlayerNames);
router.get('/event/:eventId/live/', getLiveGameweek);
router.get('/:leagueId/standings', getLeagueStandings);
router.get('/:leagueId/fixtures/:gameweek', getLeagueFixtures);
router.get('/team/:playerId/event/:eventId/picks/', getCustomPlayerList);

export { router };
