import "./Tile3.css";
import voice_channel from '../../../assets/voice_channel.svg';

const Tile3 = () => {
    return (
        <div className="tile3-holder">
            <div className="tile3-text">
                <h3>Where hanging out is easy</h3>
                <p>Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.</p>
            </div>
            <img className="tile3-image" src={voice_channel} alt="davescord voice channel demo"/>
        </div>
    )
}

export default Tile3;
