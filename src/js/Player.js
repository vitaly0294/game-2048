export class Player {
	constructor({
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
	}) {
		this.id = id;
		this.name = name;
		this.score = score;
		this.scorePrevState = scorePrevState;
		this.time = time;
		this.gameMatrix = gameMatrix;
		this.gameMatrixPrevState = gameMatrixPrevState;
		this.bestScore = bestScore;
		this.bestTime = bestTime;
		this.numMov = numMov;
	}
}
