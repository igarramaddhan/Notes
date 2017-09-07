import React, { Component } from 'react'
import {
    View,
    Animated,
    StyleSheet,
    StatusBar,
    Dimensions,
    Text,
    ScrollView,
    TextInput
} from 'react-native'

import Icon from '../components/Icon'
import FloatLabelInput from '../components/FloatingLabelInput'

let { width, height } = Dimensions.get("screen")

export default class Main extends Component {
    constructor() {
        super()
        this.state = {
            value: '',
            newTitle: '',
            category: ['test'],
            drawer: false,
            list: false,
        }
    }
    componentWillMount() {
        this._animatedSlide = new Animated.Value(0);
    }
    onPressHandle() {
        this.setState({ drawer: !this.state.drawer, list: !this.state.list })
    }
    handleTextChange1 = (newText) => {
        this.setState({ value: newText });
    }
    handleTextChange2 = (newText) => {
        this.setState({ newTitle: newText });
    }
    componentDidUpdate() {
        Animated.timing(this._animatedSlide, {
            toValue: this.state.drawer ? 1 : 0,
            duration: 200,
        }).start();
    }
    clearText(fieldName) {
        this.refs[fieldName].setNativeProps({text: ''});
      }    
    handleAddCategory() {
        this.state.category.push(this.state.newTitle);
        this.setState({ list: !this.state.list })
        setTimeout(() => this.setState({ list: !this.state.list }), 200)
        this.clearText('category')
    }
    handleRemoveCategory(key, id) {
        let newArr = []
        for (let x = 0; x < this.state.category.length; x++){
            if (key === this.state.category[x] && Math.abs(this.state.category.length-1-id) === x) {

            } else {
                console.log(this.state.category.length - id -1, this.state.category.indexOf(key))
                newArr.push(this.state.category[x]);
            }
        }
        this.setState({category: newArr})
    }    

    renderList() {
        return (
            <View>
                {this.state.category.slice(0).reverse().map((text, id) => {
                    console.log(text, id)
                    return (
                        <View key={id} style={{ flexDirection: 'row',padding: 10, justifyContent: 'space-between', margin: 2, width: 165, height: 50, backgroundColor: 'white', elevation: 1, shadowColor: 'black',shadowOffset: { width: 0, height: 3 },shadowRadius: 5,borderRadius: 2, }}>
                            <Text style={{ fontSize: 20 }}>{text}</Text>
                            <Icon icon={require("../assets/icons/remove.png")} onPressHandle={()=>this.handleRemoveCategory(text, id)} />
                        </View>    
                    )
                })}
            </View>
        )
    }

    renderMenu() {
        let drawerStyle = {
            position: 'absolute',
            width: this._animatedSlide.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 75]
            }),
        }
        return (
            <View>
                <View style={{ width: 180, height: 50, margin: 10, alignContent: 'space-between', flexDirection: 'row', justifyContent: 'center', padding: 5 }}>
                    <TextInput
                        style={{ width: 150, height: 40, fontSize: 18 }}
                        placeholder="Category name"
                        placeholderTextColor="#aaa"
                        autoCapitalize="sentences"
                        underlineColorAndroid="black"
                        onChangeText={this.handleTextChange2}
                        ref={'category'}
                    />
                    <Icon icon={require("../assets/icons/add.png")} onPressHandle={this.handleAddCategory.bind(this)} />
                </View>
                <ScrollView style={{ margin: 10, marginBottom: 10, height: height - 200 }} scr>
                    {
                        this.state.list ? this.renderList() : null
                    }
                </ScrollView>
            </View>
        )
    }
    render() {
        let drawerStyle = {
            position: 'absolute',
            width: this._animatedSlide.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 200]
            }),
        }
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={"#00b0ff"} barStyle={"light-content"} />
                <View style={styles.menuBar}>
                    <Icon icon={require("../assets/icons/menu.png")} onPressHandle={this.onPressHandle.bind(this)} />
                    <Icon icon={require("../assets/icons/add.png")} onPressHandle={this.onPressHandle.bind(this)} />
                </View>

                <View style={styles.content}>
                    <Animated.View style={[styles.drawer, { width: drawerStyle.width }]}>
                        {
                            this.state.drawer ? this.renderMenu() : null
                        }
                    </Animated.View>

                    <View style={styles.notes}>
                        <FloatLabelInput
                            label={"Test"}
                            backgroundColor={"#aaa"}
                            borderColor={"black"}
                            textColor={"black"}
                            value={this.state.value}
                            onChangeText={this.handleTextChange1}
                            width={[100, 150]}
                            height={30}

                        />
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#00b0ff',
    },
    drawer: {
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        borderRadius: 2,
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 5,
        flexDirection: 'row',
        borderRadius: 2
    },
    notes: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 2,

    }
});