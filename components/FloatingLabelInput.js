import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Animated
} from 'react-native';


export default class FloatingLabelInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false
        }
    }
    componentWillMount() {
        this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
    }
    handleFocus() {
        this.setState({ isFocused: true })
    }
    handleBlur() {
        this.setState({ isFocused: false })
    }
    componentDidUpdate() {
        Animated.timing(this._animatedIsFocused, {
            toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
            duration: 200,
        }).start();
    }
    render() {
        let { label, backgroundColor, borderColor, textColor, ...props } = this.props;
        let { isFocused } = this.state;
        let labelStyle = {
            position: 'absolute',
            left: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [25, 0]
            }),
            top: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [25, 0]
            }),
            fontSize: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 18]
            }),
            color: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: ["#aaa", "#000"]
            }),
        }
        let boxStyle = {
            width: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 300]
            }),
            backgroundColor: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: ["transparent", backgroundColor]
            }),
            borderWidth: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
            }),
            lineWidth: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 300]
            }),
            borderWidth1: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0]
            }),
            top: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -50]
            })
        }
        return (
            <Animated.View style={{ paddingTop: 18, width: boxStyle.width }}>
                <Animated.Text style={labelStyle}>{label}</Animated.Text>
                <Animated.View style={{ backgroundColor: boxStyle.backgroundColor, marginTop: 3, borderWidth: boxStyle.borderWidth1 , borderColor: borderColor  }}>
                    <TextInput
                        {...props}
                        style={{ height: 50, fontSize: 20, color: textColor, padding: 10 }}
                        underlineColorAndroid={'transparent'}
                        onFocus={this.handleFocus.bind(this)}
                        onBlur={this.handleBlur.bind(this)}
                    />
                </Animated.View>
                <Animated.View style={{ width: boxStyle.lineWidth, borderWidth: boxStyle.borderWidth, borderColor: 'black', marginTop: boxStyle.top }}></Animated.View>
            </Animated.View>
        )
    }
}