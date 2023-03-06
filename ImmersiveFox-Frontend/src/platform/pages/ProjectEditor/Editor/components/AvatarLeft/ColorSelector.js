import React, { useState } from 'react';
import { useContext } from "react";
import { ChromePicker, GithubPicker } from "react-color";

import EditorContext from "../../../EditorContext";
import { colorPalette } from '../../../../../../utils/colors';
import colorPickerIcon from "../../../../../../assets/icons/Platform/colorPicker.svg";
import styles from "./ColorSelector.module.scss";

const ColorSelector = ({ isCircleBackground = false }) => {
  const { requestConfigs, setRequestConfigs } = useContext(EditorContext);
  const [showColor, setShowColor] = useState(false);
  const [color, setColor] = useState({});

  const { rgb } = color || {};
  const updateColor = (color) => {
    setColor(color);
    setRequestConfigs(
      isCircleBackground ?
        {
          ...requestConfigs,
          circleBackground: color.hex,
        } :
        {
          ...requestConfigs,
          background: color.hex,
        }
    )
  }

  return (
    <div className={styles.custom_color_picker}>
      <div className={styles.custom_color_picker__wrap}>
        <div>
          <button onClick={() => setShowColor(!showColor)}>
            <img src={colorPickerIcon} alt="color-picker" />
          </button>
        </div>
        <span>Colors</span>
      </div>
      {showColor
        ? <ChromePicker width="100%" color={rgb} onChange={updateColor} disableAlpha />
        : <GithubPicker
          triangle="hide"
          colors={colorPalette}
          width="100%"
          color={rgb}
          onChange={updateColor}
          className={styles.custom_color_picker__github_picker}
        />
      }
    </div>
  )
};

export default ColorSelector;