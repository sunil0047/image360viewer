import React, { Component } from 'react';
import './css/style.css';

export class Image360Viewer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      currentIndex: 1,
    };
    this.isDragging = false;
    this.moveStart = {
      x: 0,
      y: 0
    };
    this.moveStop = {
      x: 0,
      y: 0
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

  throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return (ev) => {
      const context = this;

      this.moveStop.x = ev.clientX;
      this.moveStop.y = ev.clientY;
      if (!lastRan) {
        func.apply(context);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc)
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    }
  }

  mouseMoveHandler = (ev) => {
    if (this.isDragging) {
      this.moveImage(this.moveStart.x - this.moveStop.x);
    }
  }

  mouseDownHandler = (ev) => {
    ev.preventDefault();
    this.moveStart.x = ev.clientX;
    this.moveStart.y = ev.clientY;
    this.isDragging = true;
  }

  mouseUpHandler = (ev) => {
    ev.preventDefault();

    this.isDragging = false;
    this.moveStart.x = 0;
    this.moveStart.y = 0;
  }

  mouseOverHandler = () => {
    this.stopView();
  }  

  mouseLeaveHandler = () => {
    this.startView();
  }

  renderLoading() {
    return <div>
              Loading...
    </div>;
  }

  renderViewer() {
    let style = {
      height: this.props.height || '',
      width: this.props.width || ''
    };

    return <div
              className="img_container"
              style={style}
            >
              <img
                src={this.getCurrentImageSource()}
                onMouseDown={this.mouseDownHandler}
                onMouseMove={this.throttle(this.mouseMoveHandler, 1000)}
                onMouseUp={this.mouseUpHandler}
              ></img>
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

      // this.startView();
    });
  }

  moveImage(diff) {
    if (diff > 0) {
      this.setState({
        currentIndex: (this.state.currentIndex % 36) + 1
      });
    } else {
      let currentIndex = ((this.state.currentIndex % 36) - 1) || 36;
      if (currentIndex < 0) {
        currentIndex = 35;
      }
      this.setState({
        currentIndex: currentIndex
      });
    }
  }

  startView() {
    let timer = setInterval(() => {
      if (this.state.currentIndex === 36) {
        clearTimeout(timer);
        this.timer = null;
      }
      this.setState({
        currentIndex: (this.state.currentIndex % 36) + 1
      });
    }, 500);
    this.timer = timer;
  }

  stopView() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}