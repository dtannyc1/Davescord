import "./Tile3.css";
import voice_channel from '../../../assets/voice_channel.svg';

const Tile3 = () => {
    return (
        <div className="tile3-holder">
            <div className="tile3-text">
                <h3>Where live chat happens with WebSockets</h3>
                <p>Instantly communicate with your community in real time using WebSockets connected to the Rails backend via Action Cable</p>
            </div>
            <img className="tile3-image" src={voice_channel} alt="davescord voice channel demo"/>
        </div>
    )
}

export default Tile3;
