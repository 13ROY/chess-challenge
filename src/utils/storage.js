// Local storage utilities for game persistence

const STORAGE_KEY = 'chess-games';
const GAME_CODE_MAP_KEY = 'chess-game-codes';

// Generate a unique 6-character game code
export const generateGameCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed ambiguous characters
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Map game codes to game IDs
const getGameCodeMap = () => {
  try {
    const data = localStorage.getItem(GAME_CODE_MAP_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error loading game code map:', error);
    return {};
  }
};

const saveGameCodeMap = (map) => {
  try {
    localStorage.setItem(GAME_CODE_MAP_KEY, JSON.stringify(map));
  } catch (error) {
    console.error('Error saving game code map:', error);
  }
};

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
  
  // Ensure game code is mapped
  if (gameData.gameCode) {
    const codeMap = getGameCodeMap();
    codeMap[gameData.gameCode] = gameId;
    saveGameCodeMap(codeMap);
  }
};

export const deleteGame = (gameId) => {
  const games = loadGames();
  const game = games[gameId];
  
  // Remove game code mapping
  if (game && game.gameCode) {
    const codeMap = getGameCodeMap();
    delete codeMap[game.gameCode];
    saveGameCodeMap(codeMap);
  }
  
  delete games[gameId];
  saveGames(games);
};

export const getGame = (gameId) => {
  const games = loadGames();
  return games[gameId] || null;
};

export const getGameByCode = (gameCode) => {
  const codeMap = getGameCodeMap();
  const gameId = codeMap[gameCode.toUpperCase()];
  if (gameId) {
    return { gameId, ...getGame(gameId) };
  }
  return null;
};

export const createGameCode = (gameId) => {
  const codeMap = getGameCodeMap();
  let code = generateGameCode();
  
  // Ensure uniqueness
  while (codeMap[code]) {
    code = generateGameCode();
  }
  
  codeMap[code] = gameId;
  saveGameCodeMap(codeMap);
  
  return code;
};
