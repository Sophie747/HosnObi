import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    availablePlayers: ['Sophie', 'Simon', 'Daniel', 'Luca', 'Thomas', 'Anja'],
    activeGame: JSON.parse(localStorage.getItem('hosnObiActiveGame')) || null,
    pastGames: JSON.parse(localStorage.getItem('hosnObiHistory')) || [],
  }),

  actions: {
    syncStorage() {
      if (this.activeGame) {
        localStorage.setItem('hosnObiActiveGame', JSON.stringify(this.activeGame))
      } else {
        localStorage.removeItem('hosnObiActiveGame')
      }
      localStorage.setItem('hosnObiHistory', JSON.stringify(this.pastGames))
    },

    startGame(players) {
      this.activeGame = {
        players: [...players],
        rounds: [],
      }
      this.syncStorage()
    },

    submitRound(roundScores) {
      this.activeGame.rounds.push({ ...roundScores })
      this.syncStorage()
    },

    endGame() {
      if (this.activeGame && this.activeGame.rounds.length > 0) {
        this.pastGames.push(this.activeGame)
      }
      this.activeGame = null
      this.syncStorage()
    },

    abandonGame() {
      this.activeGame = null
      this.syncStorage()
    },
  },
})
