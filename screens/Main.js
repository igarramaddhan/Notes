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

import Icon from '../components/Icon'
import FloatLabelInput from '../components/FloatingLabelInput'
import Drawer from '../components/Drawer'

let { width, height } = Dimensions.get("screen")

export default class Main extends Component {
    constructor() {
        super()
        this.state = {
            value: '',
            drawer: false
        }
    }
    componentWillMount() {
        this._animatedSlide = new Animated.Value(0);
    }
    onPressHandle() {
        this.setState({ drawer: !this.state.drawer })
    }
    handleTextChange = (newText) => {
        this.setState({ value: newText });
    }
    componentDidUpdate() {
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
            <View style={styles.container}>
                <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
                <View style={styles.menuBar}>
                    <Icon icon={require("../assets/icons/menu.png")} onPressHandle={this.onPressHandle.bind(this)} />
                </View>

                <View style={styles.content}>
                    <Animated.View style={[styles.drawer, { width: drawerStyle.width }]}>
                        {
                            this.state.drawer ? this.renderMenu() : null
                        }
                    </Animated.View>
                    <FloatLabelInput
                        label={"Test"}
                        backgroundColor={"#aaa"}
                        borderColor={"black"}
                        textColor={"black"}
                        value={this.state.value}
                        onChangeText={this.handleTextChange}

                    />
                    <ScrollView>

                    </ScrollView>

                </View>
            </View>
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