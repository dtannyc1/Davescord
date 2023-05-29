import "./Tile2.css";
import channels from '../../../assets/channels.svg';

const Tile2 = () => {
    return (
        <div className="tile2-holder">
            <img src={channels} alt="davescord channel demo"/>
            <div className="tile2-text">
                <h3>Create an invite-only place where you belong</h3>
                <p>Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</p>
            </div>
        </div>
    )
}

export default Tile2;
