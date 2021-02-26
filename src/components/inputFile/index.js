import React, {useState, useEffect} from "react";
import style from "./../buttons/BaseButton/index.module.css";
import CSVReader from "react-csv-reader";
import classNames from "classnames";
import PropTypes from "prop-types";

const InputFile = ({setFile, setMaxCounter, isFile}) => {
    const cx = classNames.bind(style);
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (!isFile) {
            setTitle("");
        }
    }, [isFile]);

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
                    <span className={style.text}>
                        {!(title && title.name.length) ? "Select files" : "File selected"}
                    </span>
                    <span className={style.hidden}>
                        <CSVReader
                            cssLabelClass="file"
                            onFileLoaded={(data, fileInfo) => {
                                setTitle(fileInfo);
                                setFile(data);
                                setMaxCounter(data.length);
                            }}
                        />
                    </span>
                </p>
            </div>
            <span className={style.file_title}>{title.name} </span>
        </div>
    );
};

InputFile.propTypes = {
    setFile: PropTypes.func,
    setMaxCounter: PropTypes.func,
    isFile: PropTypes.bool,
};

export default InputFile;
