import React, {useState, useEffect, useRef} from "react";
import styles from "./App.module.css";
import ButtonBase from "./components/buttons/BaseButton";
import {HORIZONTAL_GRID_SIZE, VERTICAL_GRID_SIZE, POSSIBLE_ACTIONS, parseInstructions} from "./utils";
import MarsRover from "./components/rover";
import InputFile from "./components/inputFile";
import classNames from "classnames";
/**
 * Given the RoverPosition, display the grid
 * @param {*} roverPosition
 */
const makeGrid = (roverPosition) => {
    const grid = [];
    for (let y = VERTICAL_GRID_SIZE; y >= 0; y--) {
        const row = [];
        for (let x = 0; x < HORIZONTAL_GRID_SIZE; x++) {
            const [roverX, roverY, direction] = roverPosition;
            const isHere = roverX == x && roverY == y;
            row.push({x, y, direction: isHere ? direction : undefined});
        }
        grid.push(row);
    }
    return grid;
};

const DEFAULT_POSITION = [3, 3, "N"];
const DEFAULT_COMMANDS = ["L", "M", "L", "M", "L", "M", "L", "M", "M"];
const DEFAULT_STEP_TIME = 500;

function App() {
    const [position, setPosition] = useState(DEFAULT_POSITION);
    const [commands, setCommands] = useState(DEFAULT_COMMANDS);
    const [csvRow, setCsvRow] = useState(0);
    const [file, setFile] = useState(null);
    const [counterUndefined, setCounterUndefined] = useState(0);
    const [maxCounter, setMaxCounter] = useState(0);
    const [isFile, setIsFile] = useState(false)

    const csx = classNames.bind(styles);
    let realCommands = useRef();
    realCommands.current = commands;

    const reset = () => {
        setCsvRow(0);
        setCounterUndefined(0);
        setIsFile(false);
    };

    /**
     * Allows loading CSVs and setting it up
     * Change row to change values
     */
    const fetchFile = async () => {
        if (file) {
            setIsFile(true);
            // const row = file.length > csvRow ? csvRow : file.length - 1; // Avoid reading row that is outside of file
            // const instructions = parseInstructions(file[row].toString().replace(",", "|"));
            // setPosition(instructions.position);
            // setCommands(instructions.commands);
            // realCommands.current = instructions.commands;

            /**
             * Change code if you want to loop movie rovers
             */
            if (file.length > csvRow) {
                const instructions = parseInstructions(file[csvRow].toString().replace(",", "|"));
                setPosition(instructions.position);
                setCommands(instructions.commands);
                realCommands.current = instructions.commands;
            }
        }
    };

    useEffect(() => {
        fetchFile();
    }, [file, csvRow]);

    /**
     * Make the next command
     * If there's no commands left, stops
     */
    const next = () => {
        // Read the next command

        const nextCommand = [...realCommands.current].shift();
        // Get the function to execture the next command
        const action = POSSIBLE_ACTIONS[nextCommand];

        // Execute the command
        const newPosition = action(position);
        setPosition(newPosition);

        // Update the list of commands
        setCommands([...realCommands.current].slice(1)); // Copy commands then shift them
    };

    /**
     * Executes the commands by calling next
     * If there's moves left, call it again
     * useRef so we can have a reference to the updated state values
     */
    const run = () => {
        const nextCommand = [...realCommands.current].shift();
        let timeout = null;
        if (nextCommand) {
            next();
            timeout = setTimeout(() => realRun.current(), DEFAULT_STEP_TIME);
        } else if (maxCounter === counterUndefined) {
            alert(`Rovers completed`);
            clearTimeout(timeout);
        } else if (nextCommand === undefined) {
            alert(`${csvRow + 1} rover completed`);
            setCounterUndefined((prevState) => prevState + 1);
            setCsvRow((prevState) => prevState + 1);
            timeout = setTimeout(() => realRun.current(), DEFAULT_STEP_TIME);
        }
    };

    const realRun = useRef();
    realRun.current = run;

    const grid = makeGrid(position);

    const buttonFunction = [run, reset];
    const buttonTitles = ["Run", "Reset"];

    return (
        <div className={styles.App}>
            <div className={styles.top}>
                {buttonFunction.map((item, index) => {
                    return <ButtonBase title={buttonTitles[index]} clickAction={item} key={index}></ButtonBase>;
                })}
            </div>
            <div className={styles.mars}>
                <div className={styles.mars_map}>
                    {grid.map((row, count) => (
                        <div key={count} className={styles.row}>
                            {row.map((cell) => (
                                <div
                                    className={csx(styles.cell, {
                                        [styles.cell__black]: cell.direction !== undefined,
                                    })}
                                    key={cell.x}
                                >
                                    {cell.direction !== undefined ? (
                                        <MarsRover
                                            animation={cell.direction}
                                            endCommand={[...realCommands.current].shift()}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.content}>
                <h2>Load CSV</h2>
                <div className={styles.content__center}>
                    <InputFile setFile={setFile} setMaxCounter={setMaxCounter} isFile={isFile}/>
                </div>
            </div>
        </div>
    );
}

export default App;
