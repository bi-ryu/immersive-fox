import React from 'react';
import ReactPlayer from "react-player";

import {HERO_VIDEO_URL} from '../../../config'
import { useWindowSize } from '../../../hooks';
import { Button } from '../../../components';
import { scrollTarget } from '../../../helpers';
import styles from './styles.module.scss';

const Hero = () => {
    const {width} = useWindowSize();
    const onScrollBlock = () => {
    // console.log("aaa")
        scrollTarget("aboutUs");
    };
    return (
        <div className={styles.hero} style={{minHeight: `${width / 1920 * 883}px`}}>
            <div className={styles.hero__heads}>
                <div className={styles.hero__heads_title}>
                    <h2>Generate Your Video Content in Hours. Not Weeks.</h2>
                    <h5>We build your digital AI twin. Generate video content with your face from any text in minutes.</h5>
                </div>
                <div className={styles.hero__heads_button}>
                    <Button title="Learn More" onClick={onScrollBlock} fullOrange />
                </div>
            </div>
            <div className={styles.hero__player}>
                <ReactPlayer className={styles.reactPlayer} url={HERO_VIDEO_URL} muted={true} playing={true} loop volume={0.2} controls={false} playsinline/>
            </div>
        </div>       
    )
}

export default Hero;