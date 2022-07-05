export const createPlayer = ({
  name = 'Anonymous',
  score = 0,
  scorePrevState = 0,
  time = 0,
  gameMatrix = [],
  gameMatrixPrevState = [],
  bestScore = 0,
  bestTime = 0,
  id = Symbol(),
  numMov = 0,
}) => {
  return {
    id: id,
    name: name,
    score: score,
    scorePrevState: scorePrevState,
    time: time,
    gameMatrix: gameMatrix,
    gameMatrixPrevState: gameMatrixPrevState,
    bestScore: bestScore,
    bestTime: bestTime,
    numMov: numMov,
  }
}
