import "./Content.css"
import Myco from './assets/images/Mycorrhiza.png';
import Endophyte from './assets/images/Endophyte.jpeg';
import MycoAudio from './assets/audio/Myco.mp3';
import EndophyteAudio from './assets/audio/Endophyte.mp3';

const Content = () => {
    return ( 
        <div className="content">
            <ul className="photos">
                <li>
                    <img src={Myco} alt="Mycorrhiza Mushroom" className="photo" ></img>
                    <div>Mycorrhiza Fungi</div>

                </li>
                <li >
                <img src={Endophyte} alt="Endophytic Mushroom" className="photo" ></img>
                <div>Endophytic Fungi</div>
                </li>
            </ul>
            <ul className="audios">
                <li className="audio-file">
                    <audio controls>
                        <source src={MycoAudio} type="audio/mp3"></source>
                    </audio>
                    <div>Mycorrhizal Mushrooms</div>
                </li>
                

                <li className="audio-file">
                <audio controls>
                        <source src={EndophyteAudio} type="audio/mp3"></source>
                    </audio>
                    <div>Endophytic Mushrooms</div>
                    
                </li>
            </ul>
            <ul className="information">
                <li><p>
                Mycorrhizal mushrooms form symbiotic relationships with the roots of most plants, significantly enhancing nutrient uptake, particularly phosphorus,
                and improving plant health. These fungi connect with plant roots, creating a vast network known as the mycorrhizal network, which facilitates nutrient
                exchange and enhances water absorption.
                In return, the mushrooms receive carbohydrates produced by the plants through photosynthesis. This mutualistic relationship not only supports the growth
                and resilience of plants but also plays a crucial role in soil health and ecosystem stability.  
                </p>
                </li>
                <li>
                    <p>
                    Endophytes are microorganisms, primarily fungi and bacteria, that live within plant tissues without causing harm. These symbiotic relationships can occur
                    in various plant species, enhancing the host plant's growth, resilience, and stress tolerance.
                    Endophytes play a crucial role in nutrient cycling and can help plants absorb nutrients more effectively. They also contribute to plant defense mechanisms, producing bioactive compounds that deter pests and pathogens. 
                    
                    </p>
                </li>
            </ul>
        </div>
     );
}
 
export default Content;