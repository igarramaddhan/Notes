import React, { Component } from 'react'
import {
    View,
    Animated,
    StyleSheet,
    StatusBar,
    Dimensions,
    Text,
    ScrollView
} from 'react-native'

import Icon from './Icon'
import FloatLabelInput from './FloatingLabelInput'

let { width, height } = Dimensions.get("screen")

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            drawer: this.props.isOpen
        }
    }
    componentWillMount() {
        this._animatedSlide = new Animated.Value(0);
    }
    onPressHandle() {
        this.setState({ drawer: !this.state.drawer })
    }
    componentDidUpdate() {
        console.log(this.state.drawer)
        Animated.timing(this._animatedSlide, {
            toValue: this.state.drawer ? 1 : 0,
            duration: 200,
        }).start();

    }
    addHandle() {

    }
    renderMenu() {
        let drawerStyle = {
            position: 'absolute',
            width: this._animatedSlide.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 100]
            }),
        }
        return (
            <Icon icon={require("../assets/icons/add.png")} onPressHandle={this.onPressHandle.bind(this)} />
        )
    }
    render() {
        let drawerStyle = {
            position: 'absolute',
            width: this._animatedSlide.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 100]
            }),
        }
        return (
            <Animated.View style={[styles.drawer, { width: drawerStyle.width }]}>
                {
                    this.state.drawer ? this.renderMenu() : null
                }
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: 'white',
    },
    drawer: {
        backgroundColor: 'yellow',
        marginRight: 5
    },
    content: {
        flex: 1,
        flexDirection: 'row'
    },
    menuBar: {
        width: width - 10,
        height: 56,
        backgroundColor: 'white',
        elevation: 1,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        justifyContent: 'center',
        padding: 5,
        marginBottom: 5
    }
});