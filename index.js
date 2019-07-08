import React, { Component } from 'react';
import { render } from 'react-dom';
import { Image360Viewer } from './components/Image360Viewer/Image360Viewer.js';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      baseURL: 'https://raw.githubusercontent.com/pranjalnarayan/image360viewer/master/images/',
      type: 'jpeg'
    };
  }

  render() {
    return (
      <div>
        <Image360Viewer {...this.state} height='400px' width='400px'/>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
