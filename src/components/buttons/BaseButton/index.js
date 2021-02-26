import React from "react";
import style from "./index.module.css";
import PropTypes from "prop-types";
import classNames from "classnames";

const ButtonBase = ({clickAction, title}) => {
    const cx = classNames.bind(style);
    return (
        <div className={style.header}>
            <div
                className={cx(style.button, {
                    [style.white]: true,
                })}
            >
                <p>
                    <span className={style.bg}></span>
                    <span className={style.base}></span>
                    <span onClick={clickAction} className={style.text}>
                        {title}
                    </span>
                </p>
            </div>
        </div>
    );
};

ButtonBase.propTypes = {
    clickAction: PropTypes.func,
    title: PropTypes.string,
};

export default ButtonBase;
