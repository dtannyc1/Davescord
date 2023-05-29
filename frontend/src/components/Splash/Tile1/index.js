import "./Tile1.css";
import backgroundImg from '../../../assets/splashbackground1.svg'
import shoes from '../../../assets/shoes.svg';
import sipping from '../../../assets/sipping.svg';

const Tile1 = () => {
    return (
        <div className="tile1-holder">
            <img src={backgroundImg} className="tile1-background1" alt="mountains-background"/>
            <div className="tile1-text">
                <h3>IMAGINE A PLACE...</h3>
                <p>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
            </div>

            <img src={shoes} className="tile1-shoes" alt="characters-in-shoes"/>
            <img src={sipping} className="tile1-sipping" alt="characters-sipping-drinks"/>
        </div>
    )
}

export default Tile1;
