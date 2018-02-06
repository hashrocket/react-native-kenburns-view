/**
 * Created by Nimila Hiranya Samarasinghe
 * Links: https://github.com/nHiRanZ
 *
 * Version: 1.0.0
 *
 * Description: This reflects the KenBurns effect in a React Native Image
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
var rebound = require('rebound');
import { Image, View } from 'react-native';

class KenBurnsImage extends Component {
  state = {
    scale: null,
  };

  componentWillMount() {
    if (!this.isMounted()) {
      this.springSystemFunctions();
    }
  }

  componentWillUnmount() {
    this._scrollSpring && this._scrollSpring.destroy();
  }

  springSystemFunctions() {
    this.springSystem = new rebound.SpringSystem();
    this._scrollSpring = this.springSystem.createSpring();
    var springConfig = this._scrollSpring.getSpringConfig();
    springConfig.tension = this.props.tension;
    springConfig.friction = this.props.friction;

    this._scrollSpring.addListener({
      onSpringUpdate: () => {
        this.setState({ scale: this._scrollSpring.getCurrentValue() });
      },
    });

    this._scrollSpring.setCurrentValue(1);
  }

  componentDidMount() {
    this.animLoop();
  }

  animLoop() {
    this.animationFunc();
    this.setTimeout(() => {
      this.animLoop();
    }, Math.floor(Math.random() * 11000 + 10000));
  }

  animationFunc() {
    var max = 2.5;
    var min = 2.0;
    var endValue = (Math.random() * (max - min) + min).toFixed(3);
    this._scrollSpring.setEndValue(endValue);
    this.setTimeout(() => {
      this._scrollSpring.setEndValue(1);
    }, Math.floor(Math.random() * 6000 + 4000));
  }

  render() {
    var imageStyle = {
      alignItems: 'stretch',
      width: this.props.imageWidth,
      height: this.props.imageHeight,
      transform: [
        {
          scale: this.state.scale,
        },
      ],
    };

    return (
      <View>
        <Image
          defaultSource={this.props.placeholderSource}
          source={this.props.sourceUri}
          style={imageStyle}
        >
          {this.props.children}
        </Image>
      </View>
    );
  }
}

KenBurnsImage.propTypes = {
  onPress: PropTypes.func,
};

module.exports = KenBurnsImage;
