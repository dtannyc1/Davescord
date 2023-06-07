import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import consumer from '../../../consumer';
import { addMessage, removeMessage } from '../../../store/message';
import { setUnreadChannel, setUnreadServer } from "../../../store/unread";

const WebSocketListeners = ({websocketRestart}) => {
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

            const subscription = consumer.subscriptions.create(
                { channel: 'ServersChannel', id: server.id },
                { received: ({type, channelId, serverId}) => {
                        switch (type) {
                            case 'RECEIVE_CHANNEL':

                                break;
                            case 'DESTROY_CHANNEL':

                                break;
                            default:
                                break;
                        }
                    }
                }
            )
            allSubscriptions.push(subscription)
        })

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
