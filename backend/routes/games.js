var express = require('express');
var router = express.Router();

// In-Memory Data Store
let nextGameId = 1;
let players = ["Sophie", "Simon", "Luca", "Thomas", "Daniel", "Anja", "Laurenz", "Leander"]; 
let activeGame = null; 
const pastGames = [];

/* =============================================================================
   PLAYERS API
============================================================================= */
router.get('/players', function(req, res, next) {
    res.status(200).json({ players: players });
});

router.post('/players', function(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ error: 'Required fields: name' });
    }
    if (!players.includes(req.body.name)) players.push(req.body.name);
    res.status(201).json({ name: req.body.name });
});

/* =============================================================================
   ACTIVE GAME API
============================================================================= */
router.get('/games/active', function(req, res, next) {
    if (!activeGame) return res.status(404).json({ error: 'No active game found' });
    res.status(200).json(activeGame);
});

router.post('/games/active', function(req, res, next) {
    if (!req.body.players || req.body.players.length < 2) {
        return res.status(400).json({ error: 'Required fields: players (array of at least 2)' });
    }
    activeGame = { players: req.body.players, rounds: [] };
    res.status(201).json(activeGame);
});

router.put('/games/active/rounds', function(req, res, next) {
    if (!activeGame) return res.status(404).json({ error: 'No active game found' });
    activeGame.rounds.push(req.body);
    res.status(200).json(activeGame);
});

router.delete('/games/active', function(req, res, next) {
    activeGame = null;
    res.status(204).send(); 
});

/* =============================================================================
   PAST GAMES (HISTORY) API
============================================================================= */
router.get('/games', function(req, res, next) {
    res.status(200).json({ games: pastGames });
});

router.get('/games/:id', function(req, res, next) {
    const game = pastGames.find(g => g.id == req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.status(200).json(game);
});

router.post('/games', function(req, res, next) {
    if (!req.body.players || !req.body.rounds) {
        return res.status(400).json({ error: 'Required fields: players, rounds' });
    }
    const savedGame = { ...req.body, id: nextGameId++ };
    pastGames.push(savedGame);
    activeGame = null; 
    res.status(201).json(savedGame);
});

router.delete('/games/:id', function(req, res, next) {
    const index = pastGames.findIndex(g => g.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Game not found' });
    
    pastGames.splice(index, 1);
    res.status(204).send();
});

module.exports = router;