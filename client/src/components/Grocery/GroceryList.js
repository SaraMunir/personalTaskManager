import React, {useState, useEffect} from 'react';
import groceryList from './groceryListItems.json'
import Fruit from './assets/FRUITS.png'
import Vegetables from "./assets/VEGETABLES.png"
import Spices from "./assets/spices.png"
import DryPantry from "./assets/riceBags.png";
import Refrigerated from "./assets/refrigerator.png";
import Proteins from "./assets/protein.png";
import HomeEssentials from "./assets/toiletries.png";
import Snacks from  "./assets/snack.png";
function GroceryList() {
    const [showFruits, setShowFruits]=useState(false);
    const [fruitsList, setFruitList] = useState([
        {
            fruit: "apple", 
            amount: "1",
            checked: false
        },
        {
            fruit: "orange", 
            amount: "2",
            checked: false
        },
        {
            fruit: "strawberry", 
            amount: "10",
            checked: false
        },
    ])
    const [shoppingList, setShoppingList]=useState([]);
    const [ searchInput, setSearchInput ] = useState("");
    const [ fruitItems, setFruitItems] = useState([]);
    const [ showFruitItems, setShowFruitItems] = useState([]);
    const updateFieldChanged = index => e => {
        let newArr = [...fruitsList]; // copying the old datas array
        newArr[index].amount = e.target.value; 
        setFruitList(newArr); // ??
    }
    const checkBox = index => e => {
        let newArr = [...fruitsList]; // copying the old datas array
        newArr[index].checked = true; 
        console.log('the list to be added: ',newArr[index])
        setFruitList(newArr); // ??
        setShoppingList([...shoppingList, newArr[index]])
    }
    const handleSearchInputChange = type => e =>{
        const newInput2 = e.target.value;
        const newInput = newInput2.toLowerCase();
        setSearchInput(newInput);
        if(type == 'fruits'){
            if( newInput.length >0){
                const newList = fruitItems.filter(fruit=> 
                fruit.toLowerCase().indexOf(newInput)==0)
                setShowFruitItems( newList);
            }
            else {
                setShowFruitItems([]);
            }
        }
    }
    function Search(item){
        setSearchInput(item);
        setShowFruitItems([]);
    }
    function ShowFruits(){
        if(showFruits == false){
            setShowFruits(true)
        }else 
        setShowFruits(false)
    }
    function updateSets(){
        groceryList.map(list=>{
            if(list.category == "fruits"){
                setFruitItems(list.list_item)
            }
        })
    }
    useEffect(function(){
        updateSets()

    },[])
    return (
        <div className="row container mx-auto pt-2">
            <div className="myShoppingList">
                <h6>shopping list</h6>
                {shoppingList.map(list=>
                    <li class="list-group-item">{list.fruit} {list.amount}</li>
                    )}
            </div>
            <div className="fruits card groceryCrdWdth mr-2 mb-2">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex">
                            <img src={Fruit} className="groceryImg" alt=""/>
                            <h3 className="text-center pt-4 pl-2">Fruits</h3>
                        </div>
                    </div>
                    <hr style={{margin:'0'}}/>
                    <div className="text-center">
                        {showFruits == false ? <i class="fas fa-2x fa-caret-down onHvrGrey" onClick={ShowFruits}></i> : <i class="fas fa-2x fa-caret-up onHvrGrey" onClick={ShowFruits}></i>}
                    </div>
                    <div className={showFruits== false ? "hide": ""}>
                        <div class="form-group  mb-3">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username"
                                onChange={handleSearchInputChange("fruits")}
                                value={searchInput} aria-describedby="basic-addon2"/>
                                <div class="input-group-append">
                                    <span class="input-group-text" id="basic-addon2"><i class="fas fa-plus mt-1 grey"></i></span>
                                </div>
                            </div>
                            <div>
                            {showFruitItems.map(item=>
                                <li class="list-group-item" onClick={()=>Search(item)}>{item} </li>
                                )}
                            </div>
                        </div>
                        <ul class="list-group">
                            {fruitsList.map((fruit, idx)=>
                                {
                                    return(
                                    <div className="groceryListItm d-flex justify-content-between">
                                        {fruit.checked == false ? 
                                        <i class="fas fa-circle mt-1" onClick={checkBox(idx)}></i> 
                                        :
                                        <i class="fas fa-check-circle mt-1 green"></i> }
                                        <p>{fruit.fruit}</p>
                                        <input className="fruitInp"
                                        key={`amnt-${idx}`}
                                        style={{width: '30%'}} type="number" name="amount" value={fruit.amount} onChange={updateFieldChanged(idx)}/>
                                    </div>
                                    )}
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="vegetable card groceryCrdWdth mr-2 mb-2">
                <img src={Vegetables} className="groceryImg" alt=""/>
                <h5 className="text-center">Vegetables</h5>
            </div>
            <div className="Spices card groceryCrdWdth mr-2 mb-2">
                <img src={Spices} className="groceryImg" alt=""/>
                <h5 className="text-center">Spices</h5>
            </div>
            <div className="DryPantry card groceryCrdWdth mr-2 mb-2">
                <img src={DryPantry} className="groceryImg" alt=""/>
                <h5 className="text-center">Dry Pantry</h5>
            </div>
            <div className="Refrigerated card groceryCrdWdth mr-2 mb-2">
                <img src={Refrigerated} className="groceryImg" alt=""/>
                <h5 className="text-center">Refrigerated Items </h5>
            </div>
            <div className="Proteins card groceryCrdWdth mr-2 mb-2">
                <img src={Proteins} className="groceryImg" alt=""/>
                <h5 className="text-center">Proteins</h5>
            </div>
            <div className="HomeEssentials card groceryCrdWdth mr-2 mb-2">
                <img src={HomeEssentials} className="groceryImg" alt=""/>
                <h5 className="text-center">Home Essentials </h5>
            </div>
            <div className="Snacks card groceryCrdWdth mr-2 mb-2">
                <img src={Snacks} className="groceryImg" alt=""/>
                <h5 className="text-center">Snacks</h5>
            </div>
        </div>
    )
}

export default GroceryList
