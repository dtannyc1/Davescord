import './SubscriberList.css'
import { useParams } from "react-router-dom";
import UserItem from '../UserItem';
import { useSelector } from 'react-redux';

const SubscriberList = () => {
    const {serverId} = useParams();
    const currentServer = useSelector(state => state.servers[serverId]);
    const users = useSelector(state => state.users)

    if (!currentServer) return null;
    return (
        <div className="subscriber-list-holder">
            <div className="role-title">Owner &nbsp;&mdash;&nbsp; 1</div>
            <UserItem user={users[currentServer.ownerId]}/>

            {(!currentServer.subscribers || currentServer.subscribers.length <= 1) ? null :
                <>
                    <div className="role-title">Subscribers &nbsp;&mdash;&nbsp; {currentServer.subscribers.length-1}</div>
                    {currentServer.subscribers.map(subscriberId => {
                        if (subscriberId !== currentServer.ownerId) {
                            return <UserItem key={subscriberId} user={users[subscriberId]}/>
                        } else {
                            return <div key={subscriberId}/>
                        }
                    })}
                </>
            }
        </div>
    )
}

export default SubscriberList
