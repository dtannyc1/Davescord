import "./Tile2.css";
import channels from '../../../assets/channels.svg';

const Tile2 = () => {
    return (
        <div className="tile2-holder">
            <img className="tile2-image" src={channels} alt="davescord channel demo"/>
            <div className="tile2-text">
                <h3>Create a place where you belong</h3>
                <p>This Discord clone allows users to create servers which are organized into topic-based channels where they can collaborate and share ideas without clogging up a group chat.</p>
            </div>
        </div>
    )
}

export default Tile2;
