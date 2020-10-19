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
    const userId = localStorage.id
    const [ shoppingListShow, setSoppingListShow ]=useState(true);
    const [ showFruits, setShowFruits ]=useState(false);
    const [ showVegetables, setShowVegetables ]=useState(false);
    const [ showSpices, setShowSpices ]=useState(false);
    const [ fruitsList, setFruitList ] = useState([
        {
            id: 01,
            fruit: "apple", 
            amount: "1",
            checked: false
        },
        {
            id: 02,
            fruit: "orange", 
            amount: "2",
            checked: false
        },
        {
            id:03,
            fruit: "strawberry", 
            amount: "10",
            checked: false
        },
    ])
    const [ vegetableList, setVegetableList ] = useState([
        {
            id: 04,
            vegetable: "Broccoli", 
            amount: "1",
            checked: false
        },
        {
            id: 05,
            vegetable: "BrusselSprouts", 
            amount: "2",
            checked: false
        },
        {
            id: 06,
            vegetable: "Carrots", 
            amount: "10",
            checked: false
        },
    ])
    const [ spiceList, setSpiceList ] = useState([
        {
            id: 05,
            vegetable: "Broccoli", 
            amount: "1",
            checked: false
        },
        {
            id: 06,
            vegetable: "BrusselSprouts", 
            amount: "2",
            checked: false
        },
        {
            id: 07,
            vegetable: "Carrots", 
            amount: "10",
            checked: false
        },
    ])
  
    const [ searchInput, setSearchInput ] = useState("");
    const [ searchVegInput, setVegSearchInput ] = useState("");
    const [ fruitItems, setFruitItems] = useState([]);
    const [ vegetableItems, setVegetableItems] = useState([]);
    const [ showFruitItems, setShowFruitItems] = useState([]);
    const [ showVegetableItems, setShowVegetableItems] = useState([]);
    const [ shoppingList, setShoppingList]=useState(JSON.parse(localStorage.newShoppingList)
    );
    const updateFieldChanged = (index, type) => e => {
        if(type === 'fruit'){
            let newArr = [...fruitsList]; // copying the old datas array
            newArr[index].amount = e.target.value; 
            setFruitList(newArr); // ??
        }
        if(type === 'vegetables'){
            let newArr = [...vegetableList]; // copying the old datas array
            newArr[index].amount = e.target.value; 
            setVegetableList(newArr); // ??
        }
        if(type === 'spices'){
            let newArr = [...spiceList]; // copying the old datas array
            newArr[index].amount = e.target.value; 
            setVegetableList(newArr); // ??
        }
    }
    const checkBox = (type, id) => e => {
        console.log('type: ', type)
        if(type === 'fruit'){
            let newArr = [...fruitsList];
            let newShopItm = {}
            console.log('shoppingList: ', shoppingList)
            let newShoppingList = [...shoppingList]
            newArr.map(fruit=>{
                if(fruit.id === id){
                    if(fruit.checked === false){
                        fruit.checked = true
                        fruit.type = 'fruit'
                        fruit.itemName = fruit.fruit
                        newShopItm = fruit;
                        newShoppingList.push(newShopItm)
                        console.log(' trial newShoppingList: ', newShoppingList)
                        localStorage.setItem('newShoppingList', JSON.stringify (newShoppingList));
                        setShoppingList(newShoppingList)
                        return
                    }
                    if(fruit.checked === true){
                        fruit.checked = false
                        const deletedArr = shoppingList.filter((item,idx) => item.id !== fruit.id)
                        localStorage.setItem('newShoppingList', JSON.stringify(deletedArr));
                        setShoppingList(deletedArr)
                        return
                    }
                }
            })
        }
        if(type === 'vegetables'){
            let newArr = [...vegetableList];
            let newShopItm = {}
            console.log('shoppingList: ', shoppingList)
            let newShoppingList = [...shoppingList]
            newArr.map(vegetables=>{
                if(vegetables.id === id){
                    if(vegetables.checked === false){
                        vegetables.checked = true
                        vegetables.type = 'vegetables'
                        vegetables.itemName = vegetables.vegetable
                        newShopItm = vegetables;
                        newShoppingList.push(newShopItm)
                        console.log(' trial newShoppingList: ', newShoppingList)
                        localStorage.setItem('newShoppingList', JSON.stringify (newShoppingList));
                        setShoppingList(newShoppingList)
                        return
                    }
                    if(vegetables.checked === true){
                        vegetables.checked = false
                        const deletedArr = shoppingList.filter((item,idx) => item.id !== vegetables.id)
                        localStorage.setItem('newShoppingList', JSON.stringify(deletedArr));
                        setShoppingList(deletedArr)
                        return
                    }
                }
            })
        }
    }
    const handleSearchInputChange = type => e =>{
        if(type == 'fruits'){
            const newInput2 = e.target.value;
            const newInput = newInput2.toLowerCase();
            setSearchInput(newInput);
            if( newInput.length >0){
                const newList = fruitItems.filter(fruit=> 
                fruit.toLowerCase().indexOf(newInput)==0)
                setShowFruitItems( newList);
            }
            else {
                setShowFruitItems([]);
            }
        }
        if(type == 'vegetables'){
            const newInput2 = e.target.value;
            const newInput = newInput2.toLowerCase();
            setVegSearchInput(newInput);
            if( newInput.length >0){
                const newList = vegetableItems.filter(fruit=> 
                fruit.toLowerCase().indexOf(newInput)==0)
                setShowVegetableItems( newList);
            }
            else {
                setShowVegetableItems([]);
            }
        }
    }
    async function loadMyList(){
        const fetchMyGroceryList = await fetch (`/api/loadMyList/${userId}`).then( res => res.json());
        console.log('fetchMyList: ', fetchMyGroceryList)
        let fruitArray = []
        let vegArray = []
        let trialArr = fetchMyGroceryList
        trialArr.map(items=>{
            if(items.ItemType === "fruit"){
                if(shoppingList.length> 0 ){
                    shoppingList.map(list=>{
                        if(list.id === items._id){
                            items.exists = true
                        }
                    })
                }
                if(items.exists === true){
                    let newFruit ={
                        id: items._id, 
                        fruit: items.ItemName, 
                        amount: "0",
                        checked: true
                    }
                    fruitArray.push(newFruit)
                } else {
                    let newFruit ={
                        id: items._id, 
                        fruit: items.ItemName, 
                        amount: "0",
                        checked: false
                    }
                    fruitArray.push(newFruit)
                }
            }
            if(items.ItemType === "vegetables"){
                if(shoppingList.length> 0 ){
                    shoppingList.map(list=>{
                        if(list.id === items._id){
                            items.exists = true
                        }
                    })
                }
                if(items.exists === true){
                    let newFruit ={
                        id: items._id, 
                        vegetable: items.ItemName, 
                        amount: "0",
                        checked: true
                    }
                    vegArray.push(newFruit)
                } else {
                    let newFruit ={
                        id: items._id, 
                        vegetable: items.ItemName, 
                        amount: "0",
                        checked: false
                    }
                    vegArray.push(newFruit)
                }
            }
        })
        // if(vegArray)
        if(fruitArray.length>0){
            setFruitList(fruitArray)
        }
        if(vegArray.length>0){
            setVegetableList(vegArray)
        }
    }
    async function addToMyList(item, type){
        console.log('type to be added to my list: ', type)
        if(type === 'fruit'){
            setSearchInput('');
            setShowFruitItems([]);
        }
        if(type === 'vegetables'){
            setVegSearchInput('');
            setShowVegetableItems([]);
        }
        const groceryItm ={
            ownerId: userId,
            ItemType: type,
            ItemName : item,
        }
        console.log('groceryItm: ', groceryItm)
        const addToMyList = await fetch(`/api/addToMyList`, 
        {   method: 'post', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(groceryItm)
        }).then( result => result.json());
        // setFruitList([...fruitsList, newFruit])
        loadMyList()
    }
    function ShowMore(type){
        if (type === "fruits"){
            if(showFruits == false){
                setShowFruits(true)
            }else 
            setShowFruits(false)
        }
        // showVegetables, setShowVegetables
        if (type === "vegetables"){
            if(showVegetables == false){
                setShowVegetables(true)
            }else 
            setShowVegetables(false)
        }
    }
    function updateSets(){
        groceryList.map(list=>{
            if(list.category == "fruits"){
                setFruitItems(list.list_item)
            }
            if(list.category == "vegetables"){
                setVegetableItems(list.list_item)
            }
        })
    }
    function showShoppingLists(){
        // shoppingListShow, setSoppingListShow
        if(shoppingListShow===false){
            setSoppingListShow(true)
        } else {
            setSoppingListShow(false)
        }
    }
    async function deleteFromMyList(id){
        console.log('id: ', id)
    }
    useEffect(function(){
        updateSets()
        loadMyList()
    },[])
    return (
        <div className="row container mx-auto pt-2">
            <div className="anotherList">
            {shoppingList.length>0 ?
            <div className='shoppingListSticky'>
                {shoppingListShow === true ?
                <div className="d-flex justify-content-end">
                    <div className="myShoppingList col-1">
                        <div className="ml-1 mt-1 mb-1 d-flex justify-content-between">
                            <i class="fas fa-chevron-down mt-1 cursor" onClick={showShoppingLists}></i>
                        </div>
                    </div>
                    
                </div>
                : 
                <div className="myShoppingList">
                    <div className="ml-1 mt-1 mb-1 d-flex justify-content-between">
                        <h6>shopping list</h6> 
                        <i class="fas fa-chevron-up mt-1 cursor" onClick={showShoppingLists}></i>
                    </div>
                    <div>
                        {shoppingList.map((list, idx)=>
                        <li key={`shopping list-${idx}`} class="list-group-item" >
                            <div className="d-flex justify-content-between">
                                <div className="col-10 d-flex ">
                                    <div className="col-6">{list.itemName} </div>
                                    <div className="col-4">{list.amount} </div>
                                </div>
                            <i class="fas fa-times mt-1 cursor" onClick={checkBox(list.type, list.id)}></i> 
                            </div>
                        </li>)}
                        <div className="myBtn text-center">submit</div>
                    </div>
                </div>
                }
            </div> 
            : ''}
            </div>
            <div className="fruits">
                <div className=" card groceryCrdWdth mr-2 mb-2">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <img src={Fruit} className="groceryImg" alt=""/>
                                <h3 className="text-center pt-4 pl-2">Fruits</h3>
                            </div>
                        </div>
                        <hr style={{margin:'0'}}/>
                        <div className="text-center">
                            {showFruits == false ? <i class="fas fa-2x fa-caret-down onHvrGrey" onClick={()=>ShowMore('fruits')}></i> : <i class="fas fa-2x fa-caret-up onHvrGrey" onClick={()=>ShowMore('fruits')}></i>}
                        </div>
                        <div className={showFruits== false ? "hide": ""}>
                            <div class="form-group  mb-3">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username"
                                    onChange={handleSearchInputChange("fruits")}
                                    value={searchInput} aria-describedby="basic-addon2"/>
                                    <div class="input-group-append">
                                        <span class="input-group-text" id="basic-addon2">
                                            <i class="fas fa-plus mt-1 grey" onClick={()=>addToMyList(searchInput, 'fruit')}></i>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                {showFruitItems.map(item=>
                                    <li class="list-group-item" onClick={()=>addToMyList(item, 'fruit')} >{item} </li>
                                    )}
                                </div>
                            </div>
                            <ul class="list-group groceryListGroup">
                                {fruitsList.map((fruit, idx)=>
                                    {
                                        return(
                                        <div className="groceryListItm d-flex justify-content-between">
                                            {fruit.checked == false ? 
                                            <i class="cursor fas fa-circle mt-1" onClick={checkBox('fruit', fruit.id)}></i> 
                                            :
                                            <i class="fas fa-check-circle mt-1 green" onClick={checkBox('fruit', fruit.id)}></i> }
                                            <p>{fruit.fruit}</p>
                                            <input className="fruitInp"
                                            key={`amnt-${idx}`}
                                            style={{width: '30%'}} type="number" name="amount" value={fruit.amount} onChange={updateFieldChanged(idx, 'fruit')}/>
                                            <i class="fas fa-times mt-1 cursor" onClick={()=>deleteFromMyList(fruit.id)}></i>
                                        </div>
                                        )}
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="vegetables">
                <div className="card groceryCrdWdth mr-2 mb-2">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <img src={Vegetables} className="groceryImg" alt=""/>
                                <h3 className="text-center pt-4 pl-2">Vegetables</h3>
                            </div>
                        </div>
                        <hr style={{margin:'0'}}/>
                        <div className="text-center">
                            {showVegetables == false ? <i class="fas fa-2x fa-caret-down onHvrGrey" onClick={()=>ShowMore('vegetables')}></i> : <i class="fas fa-2x fa-caret-up onHvrGrey" onClick={()=>ShowMore('vegetables')}></i>}
                        </div>
                        <div className={showVegetables== false ? "hide": ""}>
                            <div class="form-group  mb-3">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username"
                                    onChange={handleSearchInputChange("vegetables")}
                                    value={searchVegInput} aria-describedby="basic-addon2"/>
                                    <div class="input-group-append">
                                        <span class="input-group-text" id="basic-addon2">
                                            <i class="fas fa-plus mt-1 grey" onClick={()=>addToMyList(searchVegInput, 'vegetables')}></i>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    {showVegetableItems.map(item=>
                                    <li class="list-group-item" onClick={()=>addToMyList(item, 'vegetables')} >{item} </li>
                                    )}
                                </div>
                            </div>
                            <ul class="list-group groceryListGroup">
                                {vegetableList.map((vegetable, idx)=>
                                    {
                                        return(
                                        <div className="groceryListItm d-flex justify-content-between">
                                            {vegetable.checked == false ? 
                                            <i class="cursor fas fa-circle mt-1" onClick={checkBox('vegetables', vegetable.id)}></i> 
                                            :
                                            <i class="fas fa-check-circle mt-1 green" onClick={checkBox('vegetables', vegetable.id)}></i> }
                                            <p>{vegetable.vegetable}</p>
                                            <input className="fruitInp"
                                            key={`amnt-${idx}`}
                                            style={{width: '30%'}} type="number" name="amount" value={vegetable.amount} onChange={updateFieldChanged(idx, 'vegetables')}/>
                                        </div>
                                        )}
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
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
