// Local storage utilities for game persistence

const STORAGE_KEY = 'chess-games';

export const saveGames = (games) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
  } catch (error) {
    console.error('Error saving games:', error);
  }
};

export const loadGames = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error loading games:', error);
    return {};
  }
};

export const saveGame = (gameId, gameData) => {
  const games = loadGames();
  games[gameId] = {
    ...gameData,
    lastUpdated: new Date().toISOString(),
  };
  saveGames(games);
};

export const deleteGame = (gameId) => {
  const games = loadGames();
  delete games[gameId];
  saveGames(games);
};

export const getGame = (gameId) => {
  const games = loadGames();
  return games[gameId] || null;
};
