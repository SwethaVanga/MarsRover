import React, {useState, useEffect} from "react";
import Rover from "./../../image/rover.png";
import PropTypes from "prop-types";
import styles from "./index.module.css";
import classNames from "classnames";

const MarsRover = ({animation, endCommand}) => {
    const [rotate, setRotate] = useState(0);

    const cx = classNames.bind(styles);
    useEffect(() => {
        switch (animation) {
            case "W":
                setRotate(-90);
                break;
            case "E":
                setRotate(90);
                break;
            case "S":
                setRotate(180);
                break;
            case "N":
                setRotate(0);
                break;
        }
        if (endCommand === undefined) {
            setRotate(0);
        }
    }, [animation, endCommand]);
    return (
        <div className={styles.rover_car}>
            <img src={Rover} alt="rover" className={cx(styles.north)} style={{transform: `rotate(${rotate}deg)`}} />
        </div>
    );
};

MarsRover.propTypes = {
    animation: PropTypes.string,
    endCommand: PropTypes.string,
};

export default MarsRover;
