import "./Content.css"
import * as assets from "../../assets/images/assets.js";
import Item from "../item/Item.js";


const Content = () => {
    return ( 
        <main className="content">
            <div className="content-grid">
                <Item img = {assets.AmanitaMuscaria} title="Amanita Muscaria" description ="" />
                <Item img = {assets.AmanitaPanterina} title="Amanita Panterina" description ="" />
                <Item img = {assets.Shitake} title="Shitake" description ="" />
                <Item img = {assets.Maitake} title="Maitake" description ="" />
                <Item img = {assets.Cordyceps} title="Cordyceps" description ="" />
                <Item img = {assets.LionsMane} title="Lions Mane" description ="" />
                <Item img = {assets.TurkeyTail} title="Turkey Tail" description ="" />
                <Item img = {assets.Yamabushitake} title="Yamabushitake" description ="" />
                <Item img = {assets.Reishi} title="Reishi" description ="" />
                
            </div>
           
        </main>
     );
}
 
export default Content;