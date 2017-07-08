import React, {Component} from 'react'
import CSSModules from 'react-css-modules'
import styles from './room.css'
import {connect} from 'react-redux'
// import * as ac from 'reduxs/actions'
import {RoomChat} from 'components/common/chats/roomChat'

import { routeHook } from 'decorators'






@connect(
    state => {
        return {
            roomInfo: state.room.currentRoom,
            msgs: state.chat.msgs
        }
    },
    dispatch => {
        return {
            clearMsgs: () => dispatch({type: 'CLEAR_MSGS'})
        }
    }
)
@routeHook
@CSSModules(styles)
export default class Room extends Component{

    constructor(props) {
        super(props)
        Object.assign(this, {})
    }

    componentDidMount () {
        this.$ws.roomApi.roomInfo()
    }

    render () {
        const {
            roomInfo,
            msgs
        } = this.props

        if (Object.keys(roomInfo).length !== 0) {
            return (
                <div styleName="currentRoom">
                    <h1>roomName: {roomInfo.roomName}</h1>
                    <div styleName="hostRoom">
                        <div styleName="gameImg">头像</div>
                        <div styleName="countInfo">
                            <div styleName="gameName">{roomInfo.host}</div>
                            <div styleName="hostSign">房主</div>
                        </div>
                    </div>
                    {roomInfo.guests.map((guest,index) => {
                        return <div key={index} styleName="guestRoom">guest{index}: {guest}</div>
                    })}
                    <button onClick={() => this.quitRoom(roomInfo.roomID)}>quit room</button>
                    <button onClick={() => this.startGame()}>start game</button>
                    <RoomChat msgs={msgs}></RoomChat>
                </div>
            )
        } else {
            return (
                <div>加载中</div>
            )
        }

    }

    quitRoom = (roomID) => {
        this.$ws.roomApi.quitRoom(roomID)
    }
    startGame = () => {
        this.$ws.gameApi.startGame()
    }
    componentWillUnmount () {
        this.props.clearMsgs()    
    }
}