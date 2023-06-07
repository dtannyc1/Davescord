import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import consumer from '../../../consumer';
import { addMessage, removeMessage } from '../../../store/message';
import { setUnreadChannel, setUnreadServer } from "../../../store/unread";

const WebSocketListeners = () => {
    const dispatch = useDispatch();
    const subscribedServers = useSelector(state => Object.values(state.servers))

    useEffect(() => {
        let allSubscriptions = [];

        subscribedServers?.forEach(server => {
            server.channels?.forEach(channelId => {
                    const subscription = consumer.subscriptions.create(
                        { channel: 'ChannelsChannel', id: channelId },
                        { received: ({type, message, messageId, channelId, serverId}) => {
                                switch (type) {
                                    case 'RECEIVE_MESSAGE':
                                        dispatch(setUnreadChannel(channelId));
                                        dispatch(setUnreadServer(serverId));
                                        dispatch(addMessage(message, channelId));
                                        break;
                                    case 'DESTROY_MESSAGE':
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
        })

        return () => {
            allSubscriptions.forEach(subscription => {
                subscription?.unsubscribe();
            })
        }
    }, [])
    return (
        <div className="mounted-websockets"></div>
    )
}

export default WebSocketListeners;
