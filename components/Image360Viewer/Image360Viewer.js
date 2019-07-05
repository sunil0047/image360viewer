import React, { Component } from 'react';
import './css/style.css';

export class Image360Viewer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      currentIndex: 1,
    };
  }

  componentWillMount() {
    this.cacheImages();
  }

  getCurrentImageSource() {
    return this.props.baseURL + 'image' + this.state.currentIndex + '.' +
            this.props.type;
  }

  renderLoading() {
    return <div>
              Loading...
    </div>;
  }

  renderViewer() {
    return <div className="img_container">
      <img src={this.getCurrentImageSource()}></img>
    </div>;
  }

  render() {
    return this.state.isLoading ? this.renderLoading() : this.renderViewer();
  }

  cacheImages() {
    this.setState({
      isLoading: false,
    })
  }
}