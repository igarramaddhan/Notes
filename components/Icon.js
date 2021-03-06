import React, { Component } from 'react';
import { View, TouchableNativeFeedback, Image } from 'react-native';

export default class Icon extends Component{
    constructor() {
        super()
    }
    render() {
        let { icon, onPressHandle } = this.props
        return (
            <TouchableNativeFeedback onPress={()=>onPressHandle()}>
                <Image
                    source={icon}
                    style={{width:26, height:26}}
                />
            </TouchableNativeFeedback>
        )
    }
}