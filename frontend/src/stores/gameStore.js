import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

export const useGameStore = defineStore('game', {
  state: () => ({
    availablePlayers: [],
    activeGame: null,
    pastGames: []
  }),

  actions: {
    async fetchInitialData() {
      try {
        const playersRes = await axios.get(`${API_URL}/players`);
        this.availablePlayers = playersRes.data.players || [];

        const pastRes = await axios.get(`${API_URL}/games`);
        this.pastGames = pastRes.data.games || [];

        const activeRes = await axios.get(`${API_URL}/games/active`);
        this.activeGame = activeRes.data;
      } catch (error) {
        if (error.response && error.response.status !== 404) {
            console.error("Error fetching initial data:", error);
        }
      }
    },

    async startGame(players) {
      try {
        const res = await axios.post(`${API_URL}/games/active`, { players });
        this.activeGame = res.data;
      } catch (error) {
        console.error("Error starting game:", error);
      }
    },

    async submitRound(roundScores) {
      try {
        const res = await axios.put(`${API_URL}/games/active/rounds`, roundScores);
        this.activeGame = res.data;
      } catch (error) {
        console.error("Error submitting round:", error);
      }
    },

    async endGame() {
      try {
        if (!this.activeGame) return;
        const res = await axios.post(`${API_URL}/games`, this.activeGame);
        this.pastGames.push(res.data);
        this.activeGame = null;
      } catch (error) {
        console.error("Error ending game:", error);
      }
    },

    async abandonGame() {
      try {
        await axios.delete(`${API_URL}/games/active`);
        this.activeGame = null;
      } catch (error) {
        console.error("Error abandoning game:", error);
      }
    }
  }
})
