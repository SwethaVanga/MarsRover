const HORIZONTAL_GRID_SIZE = 6
const VERTICAL_GRID_SIZE = 4
const POSSIBLE_DIRECTIONS = ["N", "E", "S", "W"]
const POSSIBLE_ACTIONS = {
  "M": "move",
  "L": "rotateLeft",
  "R": "rotateRight"
}

export const parseInstructions = (instructions) => {

		const [initialPosition, initialCommands] = instructions.split("|")
		const position = initialPosition.split(" ")
		const commands = initialCommands.split("")
		validatePosition(position)
		validateCommands(commands)
		return {position, commands}


}
export const validatePosition = (position) => {
	if(!position.length === 3){
		throw new Error("position should have 3 elements")
	}
	const [x, y, direction] = position
	if(parseInt(x) >= HORIZONTAL_GRID_SIZE || parseInt(x) < 0){
    throw new Error("Left position is off the grid")
  }

  if(parseInt(y) >= VERTICAL_GRID_SIZE| parseInt(y) < 0){
    throw new Error("LeRightosition is off the grid")
  }  

  if(!POSSIBLE_DIRECTIONS.includes(direction)){
    throw new Error("Facing Position Not Recognized")
  }

}

export const validateCommands = (commands) => {
	const actionList = Object.keys(POSSIBLE_ACTIONS)
	commands.forEach(element => {
		if(!actionList.includes(element)){
			throw new Error("illegal move")
		}
	});

}
