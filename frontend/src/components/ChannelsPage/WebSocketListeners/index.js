import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import consumer from '../../../consumer';
import { addMessage, removeMessage } from '../../../store/message';
import { setUnreadChannel, setUnreadServer } from "../../../store/unread";
import { addChannel, removeChannel } from "../../../store/channel";
import { addServer, fetchServer, removeServer } from "../../../store/server";
// import { useParams } from "react-router-dom";

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const DESTROY_MESSAGE = 'DESTROY_MESSAGE';
export const RECEIVE_PRIVATE_MESSAGE = 'RECEIVE_PRIVATE_MESSAGE';
export const DESTROY_PRIVATE_MESSAGE = 'DESTROY_PRIVATE_MESSAGE';
export const RECEIVE_PRIVATE_CHAT = 'RECEIVE_PRIVATE_CHAT';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const DESTROY_CHANNEL = 'DESTROY_CHANNEL';
export const RECEIVE_SERVER = 'RECEIVE_SERVER';
export const UPDATE_SERVER = 'UPDATE_SERVER';
export const DESTROY_SERVER = 'DESTROY_SERVER';

const WebSocketListeners = ({websocketRestart, setWebsocketRestart}) => {
    const dispatch = useDispatch();
    // const {serverId, channelId} = useParams();
    const subscribedServers = useSelector(state => Object.values(state.servers))

    useEffect(() => {
        let allSubscriptions = [];

        subscribedServers?.forEach(server => {
            server.channels?.forEach(channelId => {
                    const subscription = consumer.subscriptions.create(
                        { channel: 'ChannelsChannel', id: channelId },
                        { received: ({type, message, messageId, channelId, serverId}) => {
                                switch (type) {
                                    case RECEIVE_MESSAGE:
                                        dispatch(setUnreadChannel(channelId));
                                        dispatch(setUnreadServer(serverId));
                                        dispatch(addMessage(message, channelId));
                                        break;
                                    case DESTROY_MESSAGE:
                                        dispatch(removeMessage(messageId, channelId))
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                    )
                    allSubscriptions.push(subscription)
                }
            )

            const subscription = consumer.subscriptions.create(
                { channel: 'ServersChannel', id: server.id },
                { received: ({type, channel, channelId, serverId}) => {
                        switch (type) {
                            case RECEIVE_CHANNEL:
                                dispatch(addChannel(channel))
                                setWebsocketRestart(!websocketRestart) // force reset websockets
                                break;
                            case DESTROY_CHANNEL:
                                console.log("removing: " + serverId + channelId)
                                dispatch(removeChannel(channelId, serverId))
                                break;
                            case RECEIVE_SERVER:
                                dispatch(fetchServer(serverId))
                                setWebsocketRestart(!websocketRestart) // force reset websockets
                                break;
                            case UPDATE_SERVER:
                                dispatch(fetchServer(serverId))
                                setWebsocketRestart(!websocketRestart) // force reset websockets
                                break;
                            case DESTROY_SERVER:
                                dispatch(removeServer(serverId))
                                break
                            default:
                                break;
                        }
                    }
                }
            )
            allSubscriptions.push(subscription)
        });

        let subscription = consumer.subscriptions.create(
            { channel: 'UsersChannel', id: channelId },
            { received: ({type, privateMessage, privateMessageId, privateChatId}) => {
                    switch (type) {
                        case RECEIVE_PRIVATE_MESSAGE:
                            dispatch(setUnreadChannel(channelId));
                            dispatch(addMessage(message, channelId));
                            break;
                        case DESTROY_PRIVATE_MESSAGE:
                            dispatch(removeMessage(messageId, channelId))
                            break;
                        default:
                            break;
                    }
                }
            }
        )
        allSubscriptions.push(subscription)

        return () => {
            allSubscriptions.forEach(subscription => {
                subscription?.unsubscribe();
            })
        }
    }, [websocketRestart])

    return (
        <div className="mounted-websockets"></div>
    )
}

export default WebSocketListeners;
