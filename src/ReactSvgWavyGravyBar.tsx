'use strict';

import * as React from 'react';
import './themes/default.less';

export interface Iprops {
  theme?: string;
  className?: string;
  capacityStart?: number; // 容量初始位置
  capacityEnd?: number;   // 容量变化结束位置
  speed?: number;   // 变化速度, 毫秒
  step?: number;   // 步骤

  fontColor?: string; // 字体颜色
  percentFontSize?: string; // 文字大小, rem
  percentBFontSize?: string; // 百分号大小, rem
  waveColor?: string; // 浪花主要颜色
  wavebackColor?: string; // 浪花背面的颜色
  barDiameter?: string; // 圆球直径
  bubbleRotateBg?: string; // 球的前景色
}

/**
 * 执行漫水动画,直接操作 refs
 */
export class ReactSvgWavyGravyBar extends React.Component<Iprops, any> {
  static defaultProps = {
    theme: 'default',
    capacityStart: 0,
    capacityEnd: 20,
    speed: 30,
    step: 3,
    fontColor: '#ffffff',
    percentFontSize: '3rem',
    percentBFontSize: '1rem',
    wavebackColor: '#c9f1b8',
    waveColor: '#66c93b',
    barDiameter: '8.75rem',
    bubbleRotateBg: 'radial-gradient(circle at 50% 40%,#71e65d ,#27b90e 66%,#27b90e 99%)',
  };
  timer: any;
  refs: {
    wavyGravyBarCount: HTMLElement;
    wavyGravyBarWater: HTMLElement;
  };
  public componentDidMount () {
    const wavyGravyBarCountRef = this.refs.wavyGravyBarCount;
    const wavyGravyBarWaterRef = this.refs.wavyGravyBarWater;
    const { capacityStart, capacityEnd, speed, step } = this.props;
    let curCapacity = capacityStart;
    this.timer = setInterval(
      () => {
        curCapacity += step;

        // 防止 step 过大, 修正 curCapacity
        if (curCapacity >= capacityEnd) {
          curCapacity = capacityEnd;
          clearTimeout(this.timer);
        }

        wavyGravyBarCountRef.innerText = String(curCapacity);
        wavyGravyBarWaterRef.style.transform = `translate(0, ${100 - curCapacity}%)`;
      },
      speed,
    );
  }
  public componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  public buildStyles = () => {
    const { fontColor,
      percentFontSize,
      wavebackColor,
      waveColor,
      barDiameter,
      bubbleRotateBg,
      percentBFontSize } = this.props;

    return {
      percent: {
        color: fontColor,
        fontSize: percentFontSize,
      },
      percentB: {
        fontSize: percentBFontSize,
      },
      waterWaveBack: {
        fill: wavebackColor,
      },
      waterWaveFront: {
        fill: waveColor,
      },
      water: {
        background: waveColor,
      },
      container: {
        height: barDiameter,
        width: barDiameter,
      },
      bubbleRotate: {
        background: bubbleRotateBg,
      },
    };
  }
  public render () {
    const { theme, className } = this.props;
    const rootClassName = className ? `${className} wavy-gravy-bar-root-${theme}` : `wavy-gravy-bar-root-${theme}`;

    const styles = this.buildStyles();

    return (
      <div className={rootClassName}>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
        >
          <symbol id="wavy-gravy-materials">
            {/* tslint:disable */}
            <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
            <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
            <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
            <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
            {/* tslint:enable */}
          </symbol>
        </svg>
        <div className="wavy-gravy-bar-container shadow" style={styles.container}>
          <div className="bubble-rotate-offset" style={styles.bubbleRotate}>
            <div className="ball bubble" />
          </div>
          <div className="percent" style={styles.percent}>
              <div className="baseline">
                <div className="percentNum" ref="wavyGravyBarCount">0</div>
                <div className="percentB" style={styles.percentB}>%</div>
              </div>
          </div>
          <div ref="wavyGravyBarWater" className="water" style={styles.water}>
              <svg
                viewBox="0 0 560 19"
                className="water_wave water_wave_back"
                style={styles.waterWaveBack}
              >
                  <use xlinkHref="#wavy-gravy-materials"></use>
              </svg>
              <svg
                viewBox="0 0 560 19"
                className="water_wave water_wave_front"
                style={styles.waterWaveFront}
              >
                  <use xlinkHref="#wavy-gravy-materials"></use>
              </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default ReactSvgWavyGravyBar;
