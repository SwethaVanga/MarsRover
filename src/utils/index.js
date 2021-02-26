export const HORIZONTAL_GRID_SIZE = 8;
export const VERTICAL_GRID_SIZE = 6;
const POSSIBLE_DIRECTIONS = ["N", "E", "S", "W"];

export const validatePosition = (position) => {
    if (!position.length === 3) {
        throw new Error("position should have 3 elements");
    }
    const [x, y, direction] = position;
    if (parseInt(x) >= HORIZONTAL_GRID_SIZE || parseInt(x) < 0) {
        throw new Error("Left position is off the grid");
    }

    if ((parseInt(y) >= VERTICAL_GRID_SIZE) | (parseInt(y) < 0)) {
        throw new Error("LeRightosition is off the grid");
    }

    if (!POSSIBLE_DIRECTIONS.includes(direction)) {
        throw new Error("Facing Position Not Recognized");
    }
};

/**
 * Given a value, ensures the number we get is positive
 * e.g. -1 is 3 in modulo 4, JS would normally return -1
 * @param {*} value
 * @param {*} modulo
 * Credits https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
 */
const positiveModule = (value, modulo) => {
    return ((value % modulo) + modulo) % modulo;
};

/**
 * Given a position moves the rover and return the next position if valid
 */
export const move = (position) => {
    let [x, y, direction] = position;
    let newX = x;
    let newY = y;
    if (direction === "E") {
        newX = x + 1;
    }
    if (direction === "W") {
        newX = x - 1;
    }
    if (direction === "N") {
        newY = y + 1;
    }
    if (direction === "S") {
        newY = y - 1;
    }
    const newPosition = [newX, newY, direction];
    validatePosition(newPosition);
    return newPosition;
};

/**
 * Given a position return the new position after rotating left
 */
export const rotateLeft = (position) => {
    let [x, y, direction] = position;
    const index = POSSIBLE_DIRECTIONS.indexOf(direction);
    const newPosition = [x, y, POSSIBLE_DIRECTIONS[positiveModule(index - 1, POSSIBLE_DIRECTIONS.length)]];
    validatePosition(newPosition);
    return newPosition;
};

/**
 * Given a position return the new position after rotating right
 */
export const rotateRight = (position) => {
    let [x, y, direction] = position;
    const index = POSSIBLE_DIRECTIONS.indexOf(direction);
    const newPosition = [x, y, POSSIBLE_DIRECTIONS[positiveModule(index + 1, POSSIBLE_DIRECTIONS.length)]];
    validatePosition(newPosition);
    return newPosition;
};

export const POSSIBLE_ACTIONS = {
    M: move,
    L: rotateLeft,
    R: rotateRight,
};

export const validateCommands = (commands) => {
    const actionList = Object.keys(POSSIBLE_ACTIONS);
    commands.forEach((element) => {
        if (!actionList.includes(element)) {
            throw new Error("illegal move");
        }
    });
};

export const parseInstructions = (instructions) => {
    const [initialPosition, initialCommands] = instructions.split("|");
    const position = initialPosition.split(" ");
    const commands = initialCommands.split("");
    validatePosition(position);
    validateCommands(commands);
    const [x, y, direction] = position;
    return {position: [parseInt(x), parseInt(y), direction], commands};
};
