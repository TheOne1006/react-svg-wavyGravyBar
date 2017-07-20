// use jsx to render html, do not modify simple.html

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'rc-react-svg-wavyGravyBar/assets/index.less';
import ReactSvgWavyGravyBar from '../src/';

ReactDOM.render(<ReactSvgWavyGravyBar
  wavebackColor="#c9f1b8"
  waveColor="#66c93b"
  barDiameter="8.75rem" />, document.getElementById('__react-content'));
