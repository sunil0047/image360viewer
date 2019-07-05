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

  formImageSourceByIndex(index) {
    return this.props.baseURL + 'image' + index + '.' + this.props.type;
  }

  getCurrentImageSource() {
    return this.formImageSourceByIndex(this.state.currentIndex);
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

  cacheImage(index) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
    
      img.src = this.formImageSourceByIndex(index);
    });
  }

  cacheImages() {
    const imagesLoadPromise = [];
    for (let i = 1; i < 37; i++) {
      imagesLoadPromise.push(this.cacheImage(i));
    }

    Promise.all(imagesLoadPromise).then(() => {
      this.setState({
        isLoading: false,
      });

      this.startView();
    });
  }

  startView() {
    let timer = setInterval(() => {
      if (this.state.currentIndex === 36) {
        clearTimeout(timer);
      }
      this.setState({
        currentIndex: (this.state.currentIndex % 36) + 1
      });
    }, 00);
  }
}