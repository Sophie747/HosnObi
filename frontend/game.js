const express = require('express')
const router = express.Router()

let nextGameId = 1
let players = ['Player A', 'Player B', 'Player C', 'Player D', 'Player E']
let activeGame = null
const pastGames = []

const getAllPlayers = () => players
const createPlayer = (name) => {
  if (!players.includes(name)) players.push(name)
  return name
}

const getActiveGame = () => activeGame
const startActiveGame = (selectedPlayers) => {
  activeGame = { players: selectedPlayers, rounds: [] }
  return activeGame
}
const addRoundToActiveGame = (roundScores) => {
  if (!activeGame) return null
  activeGame.rounds.push(roundScores)
  return activeGame
}
const clearActiveGame = () => {
  activeGame = null
  return true
}

const getAllPastGames = () => pastGames
const getPastGameById = (id) => pastGames.find((g) => g.id == id)
const saveGameToHistory = (gameData) => {
  gameData.id = nextGameId++
  pastGames.push(gameData)
  return gameData
}
const deletePastGame = (id) => {
  const index = pastGames.findIndex((g) => g.id == id)
  if (index === -1) return false
  pastGames.splice(index, 1)
  return true
}

router.get('/players', (req, res) => res.json({ players: getAllPlayers() }))
router.post('/players', (req, res) => {
  if (!req.body.name) return res.status(400).json({ error: 'Required field: name' })
  res.status(201).json({ name: createPlayer(req.body.name) })
})

router.get('/games/active', (req, res) => {
  const game = getActiveGame()
  if (!game) return res.status(404).json({ error: 'No active game found' })
  res.json(game)
})
router.post('/games/active', (req, res) => {
  if (!req.body.players || req.body.players.length < 2) {
    return res.status(400).json({ error: 'At least two players are required' })
  }
  res.status(201).json(startActiveGame(req.body.players))
})
router.put('/games/active/rounds', (req, res) => {
  const updatedGame = addRoundToActiveGame(req.body)
  if (!updatedGame) return res.status(404).json({ error: 'No active game found' })
  res.status(200).json(updatedGame)
})
router.delete('/games/active', (req, res) => {
  clearActiveGame()
  res.status(204).send()
})

router.get('/games', (req, res) => res.json({ games: getAllPastGames() }))
router.get('/games/:id', (req, res) => {
  const game = getPastGameById(req.params.id)
  if (!game) return res.status(404).json({ error: 'Game not found' })
  res.json(game)
})
router.post('/games', (req, res) => {
  if (!req.body.players || !req.body.rounds) {
    return res.status(400).json({ error: 'Invalid game data' })
  }
  const savedGame = saveGameToHistory(req.body)
  clearActiveGame()
  res.status(201).json(savedGame)
})
router.delete('/games/:id', (req, res) => {
  if (!deletePastGame(req.params.id)) return res.status(404).json({ error: 'Game not found' })
  res.status(204).send()
})

module.exports = router
