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
import Others from  "./assets/OTHERS.png";
import Loader from  "./assets/Rolling-1s-200px.gif";

function GroceryList() {
    const userId = localStorage.id
    const [ shoppingListShow, setSoppingListShow ]=useState(true);
    const [ shoppingList, setShoppingList]=useState(localStorage.newShoppingList === '' ? [] : JSON.parse(localStorage.newShoppingList));
    const [ loader, setLoader ]=useState(false);
    const [loading, setLoading] = useState(false);

    
    const [ showFruits, setShowFruits ]=useState(false);
    const [ showVegetables, setShowVegetables ]=useState(false);
    const [ showSpices, setShowSpices ]=useState(false);
    const [ showPantry, setShowPantry ]=useState(false);
    const [ showRefrigerated, setShowRefrigerated ]=useState(false);
    const [ showSnacks, setShowSnacks ]=useState(false);
    const [ showProteins, setShowProteins ]=useState(false);
    const [ showHomeEssentials, setShowHomeEssentials ]=useState(false);
    const [ showOthers, setShowOthers ]=useState(false);
    
    const [ fruitsList, setFruitList ] = useState([
        {
            id: 1,
            fruit: "apple", 
            amount: "1",
            checked: false
        },
        {
            id: 2,
            fruit: "orange", 
            amount: "2",
            checked: false
        },
        {
            id:3,
            fruit: "strawberry", 
            amount: "10",
            checked: false
        },
    ])
    const [ vegetableList, setVegetableList ] = useState([
        {
            id: 4,
            vegetable: "Broccoli", 
            amount: "1",
            checked: false
        },
        {
            id: 5,
            vegetable: "BrusselSprouts", 
            amount: "2",
            checked: false
        },
        {
            id: 6,
            vegetable: "Carrots", 
            amount: "10",
            checked: false
        },
    ])
    const [ spiceList, setSpiceList ] = useState([
        {
            id: 7,
            itemName: "Chili powder", 
            amount: "1",
            checked: false
        },
        {
            id: 8,
            itemName: "Corriander", 
            amount: "2",
            checked: false
        },
        {
            id: 9,
            itemName: "Garlic Powder", 
            amount: "10",
            checked: false
        },
    ])
    const [ pantryList, setPantryList ] = useState([
        {
            id: 10,
            itemName: "Avocado Oil", 
            amount: "1",
            checked: false
        },
        {
            id: 11,
            itemName: "Baking powder", 
            amount: "2",
            checked: false
        },
        {
            id: 12,
            itemName: "Baking Soda", 
            amount: "10",
            checked: false
        },
    ])
    const [ refrigeratedList, setRefrigeratedList ] = useState([
        {
            id: 13,
            itemName: "Almond Milk", 
            amount: "1",
            checked: false
        },
        {
            id: 14,
            itemName: "Coconut Yogurt", 
            amount: "2",
            checked: false
        },
        {
            id: 15,
            itemName: "Eggs", 
            amount: "10",
            checked: false
        },
    ])
    const [ snacksList, setSnacksList ] = useState([
        {
            id: 16,
            itemName: "Cheese Rockets", 
            amount: "1",
            checked: false
        },
        {
            id: 17,
            itemName: "Crunchy Chickpeas", 
            amount: "2",
            checked: false
        },
        {
            id: 18,
            itemName: "Pretzels", 
            amount: "10",
            checked: false
        },
    ])
    const [ proteinsList, setProteinsList ] = useState([
        {
            id: 19,
            itemName: "Beef", 
            amount: "1",
            checked: false
        },
        {
            id: 20,
            itemName: "Chicken Breast", 
            amount: "2",
            checked: false
        },
        {
            id: 21,
            itemName: "Chicken Wings", 
            amount: "10",
            checked: false
        },
    ])
    const [ homeEssentialsList, setHomeEssentialsList ] = useState([
        {
            id: 22,
            itemName: "Dish Soap", 
            amount: "1",
            checked: false
        },
        {
            id: 23,
            itemName: "Dishwasher Tablets", 
            amount: "2",
            checked: false
        },
        {
            id: 24,
            itemName: "Hand Soap", 
            amount: "10",
            checked: false
        },
    ])
    const [ othersList, setOthersList ] = useState([])
    
    const [ searchInput, setSearchInput ] = useState("");
    const [ searchVegInput, setVegSearchInput ] = useState("");
    const [ searchSpiceInput, setSpiceSearchInput ] = useState("");
    const [ searchPantryInput, setPantrySearchInput ] = useState("");
    const [ searchRefrigeratedInput, setRefrigeratedSearchInput ] = useState("");
    const [ searchSnacksInput, setSnacksSearchInput ] = useState("");
    const [ searchProteinsInput, setProteinsSearchInput ] = useState("");
    const [ searchHomeEssentialsInput, setHomeEssentialsSearchInput ] = useState("");
    const [ searchOthersInput, setOthersSearchInput ] = useState("");


    const [ fruitItems, setFruitItems] = useState([]);
    const [ vegetableItems, setVegetableItems] = useState([]);
    const [ spiceItems, setSpiceItems] = useState([]);
    const [ pantryItems, setPantryItems] = useState([]);
    const [ refrigeratedItems, setRefrigeratedItems] = useState([]);
    const [ snacksItems, setSnacksItems] = useState([]);
    const [ proteinsItems, setProteinsItems] = useState([]);
    const [ homeEssentialsItems, setHomeEssentialsItems] = useState([]);
    const [ othersItems, setOthersItems] = useState([]);


    const [ showFruitItems, setShowFruitItems] = useState([]);
    const [ showVegetableItems, setShowVegetableItems] = useState([]);
    const [ showSpiceItems, setShowSpiceItems] = useState([]);
    const [ showPantryItems, setShowPantryItems] = useState([]);
    const [ showRefrigeratedItems, setShowRefrigeratedItems] = useState([]);
    const [ showSnacksItems, setShowSnacksItems] = useState([]);
    const [ showProteinsItems, setShowProteinsItems] = useState([]);
    const [ showHomeEssentialsItems, setShowHomeEssentialsItems] = useState([]);
    const [ showOthersItems, setShowOthersItems] = useState([]);
    const [ shoppingListTitle, setShoppingListTitle] = useState(localStorage.shoppingListTitle === '' || !localStorage.shoppingListTitle ? "Untitled" : localStorage.shoppingListTitle);

    const [ myShoppingList, setMyShoppingList] = useState([]);
    const [ shoppingDetail, setShoppingDetail] = useState('');


    function handleTitleInput(e){
        const newInput = e.target.value;
        setShoppingListTitle(newInput);
        localStorage.setItem('shoppingListTitle', newInput);
    }
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
            let newArr = [...spiceList]; 
            newArr[index].amount = e.target.value; 
            setSpiceList(newArr);
        }
        if(type === 'pantry'){
            let newArr = [...pantryList]; 
            newArr[index].amount = e.target.value; 
            setPantryList(newArr);
        }
        if(type === 'refrigerated'){
            let newArr = [...refrigeratedList]; 
            newArr[index].amount = e.target.value; 
            setRefrigeratedList(newArr);
        }
        if(type === 'snacks'){
            let newArr = [...snacksList]; 
            newArr[index].amount = e.target.value; 
            setSnacksList(newArr);
        }
        if(type === 'proteins'){
            let newArr = [...proteinsList]; 
            newArr[index].amount = e.target.value; 
            setProteinsList(newArr);
        }
        if(type === 'homeEssentials'){
            let newArr = [...homeEssentialsList]; 
            newArr[index].amount = e.target.value; 
            setHomeEssentialsList(newArr);
        }
        if(type === 'others'){
            let newArr = [...othersList]; 
            newArr[index].amount = e.target.value; 
            setOthersList(newArr);
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
        if(type === 'spices'){
            let newArr = [...spiceList];
            let newShopItm = {}
            console.log('shoppingList: ', shoppingList)
            let newShoppingList = [...shoppingList]
            newArr.map(spices=>{
                if(spices.id === id){
                    if(spices.checked === false){
                        spices.checked = true
                        spices.type = 'spices'
                        spices.itemName = spices.itemName
                        newShopItm = spices;
                        newShoppingList.push(newShopItm)
                        console.log(' trial newShoppingList: ', newShoppingList)
                        localStorage.setItem('newShoppingList', JSON.stringify (newShoppingList));
                        setShoppingList(newShoppingList)
                        return
                    }
                    if(spices.checked === true){
                        spices.checked = false
                        const deletedArr = shoppingList.filter((item,idx) => item.id !== spices.id)
                        localStorage.setItem('newShoppingList', JSON.stringify(deletedArr));
                        setShoppingList(deletedArr)
                        return
                    }
                }
            })
        }
        if(type === 'pantry'){
            let newArr = [...pantryList];
            let newShopItm = {}
            let newShoppingList = [...shoppingList]
            newArr.map(pantry=>{
                if(pantry.id === id){
                    if(pantry.checked === false){
                        pantry.checked = true
                        pantry.type = 'pantry'
                        pantry.itemName = pantry.itemName
                        newShopItm = pantry;
                        newShoppingList.push(newShopItm)
                        console.log(' trial newShoppingList: ', newShoppingList)
                        localStorage.setItem('newShoppingList', JSON.stringify (newShoppingList));
                        setShoppingList(newShoppingList)
                        return
                    }
                    if(pantry.checked === true){
                        pantry.checked = false
                        const deletedArr = shoppingList.filter((item,idx) => item.id !== pantry.id)
                        localStorage.setItem('newShoppingList', JSON.stringify(deletedArr));
                        setShoppingList(deletedArr)
                        return
                    }
                }
            })
        }
        if(type === 'refrigerated'){
            let newArr = [...refrigeratedList];
            let newShopItm = {}
            let newShoppingList = [...shoppingList]
            newArr.map(refrigerated=>{
                if(refrigerated.id === id){
                    if(refrigerated.checked === false){
                        refrigerated.checked = true
                        refrigerated.type = 'refrigerated'
                        refrigerated.itemName = refrigerated.itemName
                        newShopItm = refrigerated;
                        newShoppingList.push(newShopItm)
                        console.log(' trial newShoppingList: ', newShoppingList)
                        localStorage.setItem('newShoppingList', JSON.stringify (newShoppingList));
                        setShoppingList(newShoppingList)
                        return
                    }
                    if(refrigerated.checked === true){
                        refrigerated.checked = false
                        const deletedArr = shoppingList.filter((item,idx) => item.id !== refrigerated.id)
                        localStorage.setItem('newShoppingList', JSON.stringify(deletedArr));
                        setShoppingList(deletedArr)
                        return
                    }
                }
            })
        }
        if(type === 'snacks'){
            let newArr = [...snacksList];
            let newShopItm = {}
            let newShoppingList = [...shoppingList]
            newArr.map(snacks=>{
                if(snacks.id === id){
                    if(snacks.checked === false){
                        snacks.checked = true
                        snacks.type = 'snacks'
                        snacks.itemName = snacks.itemName
                        newShopItm = snacks;
                        newShoppingList.push(newShopItm)
                        console.log(' trial newShoppingList: ', newShoppingList)
                        localStorage.setItem('newShoppingList', JSON.stringify (newShoppingList));
                        setShoppingList(newShoppingList)
                        return
                    }
                    if(snacks.checked === true){
                        snacks.checked = false
                        const deletedArr = shoppingList.filter((item,idx) => item.id !== snacks.id)
                        localStorage.setItem('newShoppingList', JSON.stringify(deletedArr));
                        setShoppingList(deletedArr)
                        return
                    }
                }
            })
        }
        if(type === 'proteins'){
            let newArr = [...proteinsList];
            let newShopItm = {}
            let newShoppingList = [...shoppingList]
            newArr.map(proteins=>{
                if(proteins.id === id){
                    if(proteins.checked === false){
                        proteins.checked = true
                        proteins.type = 'proteins'
                        proteins.itemName = proteins.itemName
                        newShopItm = proteins;
                        newShoppingList.push(newShopItm)
                        console.log(' trial newShoppingList: ', newShoppingList)
                        localStorage.setItem('newShoppingList', JSON.stringify (newShoppingList));
                        setShoppingList(newShoppingList)
                        return
                    }
                    if(proteins.checked === true){
                        proteins.checked = false
                        const deletedArr = shoppingList.filter((item,idx) => item.id !== proteins.id)
                        localStorage.setItem('newShoppingList', JSON.stringify(deletedArr));
                        setShoppingList(deletedArr)
                        return
                    }
                }
            })
        }
        if(type === 'homeEssentials'){
            let newArr = [...homeEssentialsList];
            let newShopItm = {}
            let newShoppingList = [...shoppingList]
            newArr.map(homeEssentials=>{
                if(homeEssentials.id === id){
                    if(homeEssentials.checked === false){
                        homeEssentials.checked = true
                        homeEssentials.type = 'homeEssentials'
                        homeEssentials.itemName = homeEssentials.itemName
                        newShopItm = homeEssentials;
                        newShoppingList.push(newShopItm)
                        console.log(' trial newShoppingList: ', newShoppingList)
                        localStorage.setItem('newShoppingList', JSON.stringify (newShoppingList));
                        setShoppingList(newShoppingList)
                        return
                    }
                    if(homeEssentials.checked === true){
                        homeEssentials.checked = false
                        const deletedArr = shoppingList.filter((item,idx) => item.id !== homeEssentials.id)
                        localStorage.setItem('newShoppingList', JSON.stringify(deletedArr));
                        setShoppingList(deletedArr)
                        return
                    }
                }
            })
        }
        if(type === 'others'){
            let newArr = [...othersList];
            let newShopItm = {}
            let newShoppingList = [...shoppingList]
            newArr.map(others=>{
                if(others.id === id){
                    if(others.checked === false){
                        others.checked = true
                        others.type = 'others'
                        others.itemName = others.itemName
                        newShopItm = others;
                        newShoppingList.push(newShopItm)
                        console.log(' trial newShoppingList: ', newShoppingList)
                        localStorage.setItem('newShoppingList', JSON.stringify (newShoppingList));
                        setShoppingList(newShoppingList)
                        return
                    }
                    if(others.checked === true){
                        others.checked = false
                        const deletedArr = shoppingList.filter((item,idx) => item.id !== others.id)
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
                const newList = vegetableItems.filter(item=> 
                item.toLowerCase().indexOf(newInput)==0)
                setShowVegetableItems( newList);
            }
            else {
                setShowVegetableItems([]);
            }
        }
        if(type == 'spices'){
            const newInput2 = e.target.value;
            const newInput = newInput2.toLowerCase();
            setSpiceSearchInput(newInput);
            if( newInput.length >0){
                const newList = spiceItems.filter(item=> 
                item.toLowerCase().indexOf(newInput)==0)
                setShowSpiceItems( newList);
            }
            else {
                setShowSpiceItems([]);
            }
        }
        if(type == 'pantry'){
            const newInput2 = e.target.value;
            const newInput = newInput2.toLowerCase();
            setPantrySearchInput(newInput);
            if( newInput.length >0){
                const newList = pantryItems.filter(item=> 
                item.toLowerCase().indexOf(newInput)==0)
                setShowPantryItems( newList);
            }
            else {
                setShowPantryItems([]);
            }
        }
        if(type == 'refrigerated'){
            const newInput2 = e.target.value;
            const newInput = newInput2.toLowerCase();
            setRefrigeratedSearchInput(newInput);
            if( newInput.length >0){
                const newList = refrigeratedItems.filter(item=> 
                item.toLowerCase().indexOf(newInput)==0)
                setShowRefrigeratedItems( newList);
            }
            else {
                setShowRefrigeratedItems([]);
            }
        }
        if(type == 'snacks'){
            const newInput2 = e.target.value;
            const newInput = newInput2.toLowerCase();
            setSnacksSearchInput(newInput);
            if( newInput.length >0){
                const newList = snacksItems.filter(item=> 
                item.toLowerCase().indexOf(newInput)==0)
                setShowSnacksItems( newList);
            }
            else {
                setShowSnacksItems([]);
            }
        }
        if(type == 'proteins'){
            const newInput2 = e.target.value;
            const newInput = newInput2.toLowerCase();
            setProteinsSearchInput(newInput);
            if( newInput.length >0){
                const newList = proteinsItems.filter(item=> 
                item.toLowerCase().indexOf(newInput)==0)
                setShowProteinsItems( newList);
            }
            else {
                setShowProteinsItems([]);
            }
        }
        if(type == 'homeEssentials'){
            const newInput2 = e.target.value;
            const newInput = newInput2.toLowerCase();
            setHomeEssentialsSearchInput(newInput);
            if( newInput.length >0){
                const newList = homeEssentialsItems.filter(item=> 
                item.toLowerCase().indexOf(newInput)==0)
                setShowHomeEssentialsItems( newList);
            }
            else {
                setShowHomeEssentialsItems([]);
            }
        }
        if(type == 'others'){
            const newInput2 = e.target.value;
            const newInput = newInput2.toLowerCase();
            setOthersSearchInput(newInput);
        }
    }
    async function loadMyList(){
        console.log('starting loading 1')
        const fetchMyGroceryList = await fetch (`/api/loadMyList/${userId}`).then( res => res.json());
        console.log('fetchMyList: ', fetchMyGroceryList)
        let fruitArray = []
        let vegArray = []
        let spiceArray = []
        let pantryArray = []
        let refrigeratedArray = []
        let snacksArray = []
        let proteinsArray = []
        let homeEssentialsArray = []
        let othersArray = []
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
            if(items.ItemType === "spices"){
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
                        item: items.ItemName, 
                        amount: "0",
                        checked: true
                    }
                    spiceArray.push(newFruit)
                } else {
                    let newFruit ={
                        id: items._id, 
                        item: items.ItemName, 
                        amount: "0",
                        checked: false
                    }
                    spiceArray.push(newFruit)
                }
            }
            if(items.ItemType === "pantry"){
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
                        item: items.ItemName, 
                        amount: "0",
                        checked: true
                    }
                    pantryArray.push(newFruit)
                } else {
                    let newFruit ={
                        id: items._id, 
                        item: items.ItemName, 
                        amount: "0",
                        checked: false
                    }
                    pantryArray.push(newFruit)
                }
            }
            if(items.ItemType === "refrigerated"){
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
                        item: items.ItemName, 
                        amount: "0",
                        checked: true
                    }
                    refrigeratedArray.push(newFruit)
                } else {
                    let newFruit ={
                        id: items._id, 
                        item: items.ItemName, 
                        amount: "0",
                        checked: false
                    }
                    refrigeratedArray.push(newFruit)
                }
            }
            if(items.ItemType === "snacks"){
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
                        item: items.ItemName, 
                        amount: "0",
                        checked: true
                    }
                    snacksArray.push(newFruit)
                } else {
                    let newFruit ={
                        id: items._id, 
                        item: items.ItemName, 
                        amount: "0",
                        checked: false
                    }
                    snacksArray.push(newFruit)
                }
            }
            if(items.ItemType === "proteins"){
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
                        item: items.ItemName, 
                        amount: "0",
                        checked: true
                    }
                    proteinsArray.push(newFruit)
                } else {
                    let newFruit ={
                        id: items._id, 
                        item: items.ItemName, 
                        amount: "0",
                        checked: false
                    }
                    proteinsArray.push(newFruit)
                }
            }
            if(items.ItemType === "homeEssentials"){
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
                        item: items.ItemName, 
                        amount: "0",
                        checked: true
                    }
                    homeEssentialsArray.push(newFruit)
                } else {
                    let newFruit ={
                        id: items._id, 
                        item: items.ItemName, 
                        amount: "0",
                        checked: false
                    }
                    homeEssentialsArray.push(newFruit)
                }
            }
            if(items.ItemType === "others"){
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
                        item: items.ItemName, 
                        amount: "0",
                        checked: true
                    }
                    othersArray.push(newFruit)
                } else {
                    let newFruit ={
                        id: items._id, 
                        item: items.ItemName, 
                        amount: "0",
                        checked: false
                    }
                    othersArray.push(newFruit)
                }
            }
        })
        if(fruitArray.length>0){
            setFruitList(fruitArray)
        }
        if(vegArray.length>0){
            setVegetableList(vegArray)
        }
        if(spiceArray.length>0){
            setSpiceList(spiceArray)
        }
        if(pantryArray.length>0){
            setPantryList(pantryArray)
        }
        if(refrigeratedArray.length>0){
            setRefrigeratedList(refrigeratedArray)
        }
        if(snacksArray.length>0){
            setSnacksList(snacksArray)
        }
        if(proteinsArray.length>0){
            setProteinsList(proteinsArray)
        }
        if(homeEssentialsArray.length>0){
            setHomeEssentialsList(homeEssentialsArray)
        }
        if(othersArray.length>0){
            setOthersList(othersArray)
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
        if(type === 'spices'){
            setSpiceSearchInput('');
            setShowSpiceItems([]);
        }
        if(type === 'pantry'){
            setPantrySearchInput('');
            setShowPantryItems([]);
        }
        if(type === 'refrigerated'){
            setRefrigeratedSearchInput('');
            setShowRefrigeratedItems([]);
        }
        if(type === 'snacks'){
            setSnacksSearchInput('');
            setShowSnacksItems([]);
        }
        if(type === 'proteins'){
            setProteinsSearchInput('');
            setShowProteinsItems([]);
        }
        if(type === 'homeEssentials'){
            setHomeEssentialsSearchInput('');
            setShowHomeEssentialsItems([]);
        }
        if(type === 'others'){
            setOthersSearchInput('');
            setShowOthersItems([]);
        }
        const groceryItm ={
            ownerId: userId,
            ItemType: type,
            ItemName : item,
        }
        console.log('groceryItm: ', groceryItm)
        setLoading(true)
        const addToMyList = await fetch(`/api/addToMyList`, 
        {   method: 'post', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(groceryItm)
        }).then( result => result.json());
        loadMyList()
        setLoading(false)

    }
    function ShowMore(type){
        if (type === "fruits"){
            if(showFruits === false){
                setShowFruits(true)
            }else 
            setShowFruits(false)
        }
        if (type === "vegetables"){
            if(showVegetables === false){
                setShowVegetables(true)
            }else 
            setShowVegetables(false)
        }
        if (type === "spices"){
            if(showSpices === false){
                setShowSpices(true)
            }else 
            setShowSpices(false)
        }
        if (type === "pantry"){
            if(showPantry === false){
                setShowPantry(true)
            }else 
            setShowPantry(false)
        }
        if (type === "refrigerated"){
            if(showRefrigerated === false){
                setShowRefrigerated(true)
            }else 
            setShowRefrigerated(false)
        }
        if (type === "snacks"){
            if(showSnacks === false){
                setShowSnacks(true)
            }else 
            setShowSnacks(false)
        }
        if (type === "proteins"){
            if(showProteins === false){
                setShowProteins(true)
            }else 
            setShowProteins(false)
        }
        if (type === "homeEssentials"){
            if(showHomeEssentials === false){
                setShowHomeEssentials(true)
            }else 
            setShowHomeEssentials(false)
        }
        if (type === "others"){
            if(showOthers === false){
                setShowOthers(true)
            }else 
            setShowOthers(false)
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
            if(list.category == "spices"){
                setSpiceItems(list.list_item)
            }
            if(list.category == "pantry"){
                setPantryItems(list.list_item)
            }
            if(list.category == "refrigerated"){
                setRefrigeratedItems(list.list_item)
            }
            if(list.category == "snacks"){
                setSnacksItems(list.list_item)
            }
            if(list.category == "proteins"){
                setProteinsItems(list.list_item)
            }
            if(list.category == "homeEssentials"){
                setHomeEssentialsItems(list.list_item)
            }
            if(list.category == "others"){
                setOthersItems(list.list_item)
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
        const fetchMyGroceryList = await fetch (`/api/deleteFromMyList/${id}`).then( res => res.json());
        loadMyList()
    }
    async function submitMyGroceryList(){
        console.log('submitMyGroceryList : ', shoppingList)
        setLoader(true)
        let newArr =[];
        shoppingList.map(list=>{
            let listObj = {
                ItemType: list.type,
                ItemName : list.item ? list.item : list.itemName,
                ItemAmount : list.amount,
                done: false
            }
            newArr.push(listObj)
        })
        let newGroceryObj= {
            tittle: shoppingListTitle,
            ownerId: userId, 
            list: newArr
        }
        console.log("shopping list obj: ", newGroceryObj);
        const createMyGroceryList = await fetch(`/api/createMyShoppingList`, 
        {   method: 'post', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGroceryObj)
        }).then( result => result.json());
        if(createMyGroceryList.message === "success"){
            fruitsList.map(item=>{
                item.checked = false
            })
            vegetableList.map(item=>{
                item.checked = false
            })
            spiceList.map(item=>{
                item.checked = false
            })
            pantryList.map(item=>{
                item.checked = false
            })
            refrigeratedList.map(item=>{
                item.checked = false
            })
            snacksList.map(item=>{
                item.checked = false
            })
            proteinsList.map(item=>{
                item.checked = false
            })
            homeEssentialsList.map(item=>{
                item.checked = false
            })
            othersList.map(item=>{
                item.checked = false
            })
            setShoppingList([])
            setShoppingListTitle("Untitled")
            localStorage.setItem('newShoppingList', []);
            localStorage.setItem('shoppingListTitle', "");
            setLoader(false)
            loadShoppingList()
        }else{
            setLoader(false)
            loadShoppingList()
        }
    }
    async function loadShoppingList(){
        const fetchMyShoppingList = await fetch (`/api/loadMyShoppingList/${userId}`).then( res => res.json());
        console.log('My ShoppingLists: ',fetchMyShoppingList);
        setMyShoppingList(fetchMyShoppingList)
    }
    async function deleteShoppingList(listId){
        setLoading(true)
        const deleteMyShoppingList = await fetch (`/api/deleteMyShoppingList/${listId}`).then( res => res.json());
        // console.log('My ShoppingLists: ',fetchMyShoppingList);
        loadShoppingList()
        setLoading(false)
    }
    function showShoppingDetail(listId){
        // console.log('selected list: ', listId)
        setShoppingDetail(listId)
    }
    useEffect(function(){
        updateSets()
        loadMyList()
        loadShoppingList()
    },[])
    return (
        <div className="container mx-auto pt-2">
            <div className={loading === true ? "loaderWindow": "hide"}>
                <div className="loadingWnd">
                    <img className="loadingGif" src={Loader} alt="loadingWndow"/>
                </div>
            </div>
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
                        <input className="fruitInp"
                            style={{width: '100%', background: 'none', fontWeight: 'bolder', fontSize: '1.3rem', textTransform: 'capitalize'}} type="text" name="amount" value={shoppingListTitle} onChange={handleTitleInput}/>
                        {/* <h6>shopping list</h6>  */}
                        <i class="fas fa-chevron-up mt-1 cursor" onClick={showShoppingLists}></i>
                    </div>
                    <div className="shoppingCntr">
                        {shoppingList.map((list, idx)=>
                        <li key={`shopping list-${idx}`} class="list-group-item" >
                            <div className="d-flex justify-content-between">
                                <div className="col-10 d-flex ">
                                    <div className="col-6">{list.itemName ? list.itemName : list.item} </div>
                                    <div className="col-4">{list.amount} </div>
                                </div>
                            <i class="fas fa-times mt-1 cursor" onClick={checkBox(list.type, list.id)}></i> 
                            </div>
                        </li>)}
                    </div>
                        <div className="myBtn text-center" onClick={submitMyGroceryList}>
                            {loader=== false ? <p >submit</p> : <img src={Loader} alt="" style={{width: '25px'}}/> }
                        </div>
                </div>
                }
            </div> 
            : ''}
            </div>
            <div className="row mx-auto">
                <div className='col-4'>
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
                                            <input type="text" class="form-control" placeholder="enter list item" aria-label="enter list item"
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
                                                    <i class="fas fa-times mt-1 cursor timesIcn" onClick={()=>deleteFromMyList(fruit.id)}></i>
                                                </div>
                                                )}
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pantry">
                        <div className="card groceryCrdWdth mr-2 mb-2">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex">
                                        <img src={DryPantry} className="groceryImg" alt=""/>
                                        <h3 className="text-center pt-4 pl-2">DryPantry</h3>
                                    </div>
                                </div>
                                <hr style={{margin:'0'}}/>
                                <div className="text-center">
                                    {showPantry == false ? <i class="fas fa-2x fa-caret-down onHvrGrey" onClick={()=>ShowMore('pantry')}></i> : <i class="fas fa-2x fa-caret-up onHvrGrey" onClick={()=>ShowMore('pantry')}></i>}
                                </div>
                                <div className={showPantry== false ? "hide": ""}>
                                    <div class="form-group  mb-3">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username"
                                            onChange={handleSearchInputChange("pantry")}
                                            // value={searchVegInput} 
                                            value={searchPantryInput} 
                                            aria-describedby="basic-addon2"/>
                                            <div class="input-group-append">
                                                <span class="input-group-text" id="basic-addon2">
                                                    <i class="fas fa-plus mt-1 grey" onClick={()=>addToMyList(searchPantryInput, 'pantry')}></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            {showPantryItems.map(item=>
                                            <li class="list-group-item" onClick={()=>addToMyList(item, 'pantry')} >{item} </li>
                                            )}
                                        </div>
                                    </div>
                                    <ul class="list-group groceryListGroup">
                                        {pantryList.map((pantry, idx)=>
                                            {
                                                return(
                                                <div className="groceryListItm d-flex justify-content-between">
                                                    {pantry.checked == false ? 
                                                    <i class="cursor fas fa-circle mt-1" onClick={checkBox('pantry', pantry.id)}></i> 
                                                    :
                                                    <i class="fas fa-check-circle mt-1 green" onClick={checkBox('pantry', pantry.id)}></i> }
                                                    <p>{pantry.item ? pantry.item : pantry.itemName}</p>
                                                    <input className="fruitInp"
                                                    key={`amnt-${idx}`}
                                                    style={{width: '30%'}} type="number" name="amount" value={pantry.amount} onChange={updateFieldChanged(idx, 'pantry')}/>
                                                    <i class="fas fa-times mt-1 cursor timesIcn" onClick={()=>deleteFromMyList(pantry.id)}></i>
                                                </div>
                                                )}
                                            )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="refrigerated">
                        <div className="card groceryCrdWdth mr-2 mb-2">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex">
                                        <img src={Refrigerated} className="groceryImg" alt=""/>
                                        <h3 className="text-center pt-4 pl-2">Refrigerated</h3>
                                    </div>
                                </div>
                                <hr style={{margin:'0'}}/>
                                <div className="text-center">
                                    {showRefrigerated == false ? <i class="fas fa-2x fa-caret-down onHvrGrey" onClick={()=>ShowMore('refrigerated')}></i> : <i class="fas fa-2x fa-caret-up onHvrGrey" onClick={()=>ShowMore('refrigerated')}></i>}
                                </div>
                                <div className={showRefrigerated== false ? "hide": ""}>
                                    <div class="form-group  mb-3">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username"
                                            onChange={handleSearchInputChange("refrigerated")}
                                            // value={searchVegInput} 
                                            value={searchRefrigeratedInput} 
                                            aria-describedby="basic-addon2"/>
                                            <div class="input-group-append">
                                                <span class="input-group-text" id="basic-addon2">
                                                    <i class="fas fa-plus mt-1 grey" onClick={()=>addToMyList(searchRefrigeratedInput, 'refrigerated')}></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            {showRefrigeratedItems.map(item=>
                                            <li class="list-group-item" onClick={()=>addToMyList(item, 'refrigerated')} >{item} </li>
                                            )}
                                        </div>
                                    </div>
                                    <ul class="list-group groceryListGroup">
                                        {refrigeratedList.map((refrigerated, idx)=>
                                            {
                                                return(
                                                <div className="groceryListItm d-flex justify-content-between">
                                                    {refrigerated.checked == false ? 
                                                    <i class="cursor fas fa-circle mt-1" onClick={checkBox('refrigerated', refrigerated.id)}></i> 
                                                    :
                                                    <i class="fas fa-check-circle mt-1 green" onClick={checkBox('refrigerated', refrigerated.id)}></i> }
                                                    <p>{refrigerated.item ? refrigerated.item : refrigerated.itemName}</p>
                                                    <input className="fruitInp"
                                                    key={`amnt-${idx}`}
                                                    style={{width: '30%'}} type="number" name="amount" value={refrigerated.amount} onChange={updateFieldChanged(idx, 'refrigerated')}/>
                                                    <i class="fas fa-times mt-1 cursor timesIcn" onClick={()=>deleteFromMyList(refrigerated.id)}></i>
                                                </div>
                                                )}
                                            )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-4'>
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
                                                    <i class="fas fa-times mt-1 cursor timesIcn" onClick={()=>deleteFromMyList(vegetable.id)}></i>
                                                </div>
                                                )}
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="proteins">
                        <div className="card groceryCrdWdth mr-2 mb-2">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex">
                                        <img src={Proteins} className="groceryImg" alt=""/>
                                        <h3 className="text-center pt-4 pl-2">Proteins</h3>
                                    </div>
                                </div>
                                <hr style={{margin:'0'}}/>
                                <div className="text-center">
                                    {showProteins == false ? <i class="fas fa-2x fa-caret-down onHvrGrey" onClick={()=>ShowMore('proteins')}></i> : <i class="fas fa-2x fa-caret-up onHvrGrey" onClick={()=>ShowMore('proteins')}></i>}
                                </div>
                                <div className={showProteins== false ? "hide": ""}>
                                    <div class="form-group  mb-3">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username"
                                            onChange={handleSearchInputChange("proteins")}
                                            // value={searchVegInput} 
                                            value={searchProteinsInput} 
                                            aria-describedby="basic-addon2"/>
                                            <div class="input-group-append">
                                                <span class="input-group-text" id="basic-addon2">
                                                    <i class="fas fa-plus mt-1 grey" onClick={()=>addToMyList(searchProteinsInput, 'proteins')}></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            {showProteinsItems.map(item=>
                                            <li class="list-group-item" onClick={()=>addToMyList(item, 'proteins')} >{item} </li>
                                            )}
                                        </div>
                                    </div>
                                    <ul class="list-group groceryListGroup">
                                        {proteinsList.map((proteins, idx)=>
                                            {
                                                return(
                                                <div className="groceryListItm d-flex justify-content-between">
                                                    {proteins.checked == false ? 
                                                    <i class="cursor fas fa-circle mt-1" onClick={checkBox('proteins', proteins.id)}></i> 
                                                    :
                                                    <i class="fas fa-check-circle mt-1 green" onClick={checkBox('proteins', proteins.id)}></i> }
                                                    <p>{proteins.item ? proteins.item : proteins.itemName}</p>
                                                    <input className="fruitInp"
                                                    key={`amnt-${idx}`}
                                                    style={{width: '30%'}} type="number" name="amount" value={proteins.amount} onChange={updateFieldChanged(idx, 'proteins')}/>
                                                    <i class="fas fa-times mt-1 cursor timesIcn" onClick={()=>deleteFromMyList(proteins.id)}></i>
                                                </div>
                                                )}
                                            )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="homeEssentials">
                        <div className="card groceryCrdWdth mr-2 mb-2">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex">
                                        <img src={HomeEssentials} className="groceryImg" alt=""/>
                                        <h3 className="text-center pt-4 pl-2">HomeEssentials</h3>
                                    </div>
                                </div>
                                <hr style={{margin:'0'}}/>
                                <div className="text-center">
                                    {showHomeEssentials == false ? <i class="fas fa-2x fa-caret-down onHvrGrey" onClick={()=>ShowMore('homeEssentials')}></i> : <i class="fas fa-2x fa-caret-up onHvrGrey" onClick={()=>ShowMore('homeEssentials')}></i>}
                                </div>
                                <div className={showHomeEssentials== false ? "hide": ""}>
                                    <div class="form-group  mb-3">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username"
                                            onChange={handleSearchInputChange("homeEssentials")}
                                            // value={searchVegInput} 
                                            value={searchHomeEssentialsInput} 
                                            aria-describedby="basic-addon2"/>
                                            <div class="input-group-append">
                                                <span class="input-group-text" id="basic-addon2">
                                                    <i class="fas fa-plus mt-1 grey" onClick={()=>addToMyList(searchHomeEssentialsInput, 'homeEssentials')}></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            {showHomeEssentialsItems.map(item=>
                                            <li class="list-group-item" onClick={()=>addToMyList(item, 'homeEssentials')} >{item} </li>
                                            )}
                                        </div>
                                    </div>
                                    <ul class="list-group groceryListGroup">
                                        {homeEssentialsList.map((homeEssentials, idx)=>
                                            {
                                                return(
                                                <div className="groceryListItm d-flex justify-content-between">
                                                    {homeEssentials.checked == false ? 
                                                    <i class="cursor fas fa-circle mt-1" onClick={checkBox('homeEssentials', homeEssentials.id)}></i> 
                                                    :
                                                    <i class="fas fa-check-circle mt-1 green" onClick={checkBox('homeEssentials', homeEssentials.id)}></i> }
                                                    <p>{homeEssentials.item ? homeEssentials.item : homeEssentials.itemName}</p>
                                                    <input className="fruitInp"
                                                    key={`amnt-${idx}`}
                                                    style={{width: '30%'}} type="number" name="amount" value={homeEssentials.amount} onChange={updateFieldChanged(idx, 'homeEssentials')}/>
                                                    <i class="fas fa-times mt-1 cursor timesIcn" onClick={()=>deleteFromMyList(homeEssentials.id)}></i>
                                                </div>
                                                )}
                                            )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-4'>
                    <div className="spices">
                        <div className="card groceryCrdWdth mr-2 mb-2">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex">
                                        <img src={Spices} className="groceryImg" alt=""/>
                                        <h3 className="text-center pt-4 pl-2">Spices</h3>
                                    </div>
                                </div>
                                <hr style={{margin:'0'}}/>
                                <div className="text-center">
                                    {showSpices == false ? <i class="fas fa-2x fa-caret-down onHvrGrey" onClick={()=>ShowMore('spices')}></i> : <i class="fas fa-2x fa-caret-up onHvrGrey" onClick={()=>ShowMore('spices')}></i>}
                                </div>
                                <div className={showSpices== false ? "hide": ""}>
                                    <div class="form-group  mb-3">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username"
                                            onChange={handleSearchInputChange("spices")}
                                            // value={searchVegInput} 
                                            value={searchSpiceInput} 
                                            aria-describedby="basic-addon2"/>
                                            <div class="input-group-append">
                                                <span class="input-group-text" id="basic-addon2">
                                                    <i class="fas fa-plus mt-1 grey" onClick={()=>addToMyList(searchSpiceInput, 'spices')}></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            {showSpiceItems.map(item=>
                                            <li class="list-group-item" onClick={()=>addToMyList(item, 'spices')} >{item} </li>
                                            )}
                                        </div>
                                    </div>
                                    <ul class="list-group groceryListGroup">
                                        {spiceList.map((spice, idx)=>
                                            {
                                                return(
                                                <div className="groceryListItm d-flex justify-content-between">
                                                    {spice.checked == false ? 
                                                    <i class="cursor fas fa-circle mt-1" onClick={checkBox('spices', spice.id)}></i> 
                                                    :
                                                    <i class="fas fa-check-circle mt-1 green" onClick={checkBox('spices', spice.id)}></i> }
                                                    <p>{spice.item ? spice.item : spice.itemName}</p>
                                                    <input className="fruitInp"
                                                    key={`amnt-${idx}`}
                                                    style={{width: '30%'}} type="number" name="amount" value={spice.amount} onChange={updateFieldChanged(idx, 'spices')}/>
                                                    <i class="fas fa-times mt-1 cursor timesIcn" onClick={()=>deleteFromMyList(spice.id)}></i>
                                                </div>
                                                )}
                                            )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="snacks">
                        <div className="card groceryCrdWdth mr-2 mb-2">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex">
                                        <img src={Snacks} className="groceryImg" alt=""/>
                                        <h3 className="text-center pt-4 pl-2">Snacks</h3>
                                    </div>
                                </div>
                                <hr style={{margin:'0'}}/>
                                <div className="text-center">
                                    {showSnacks == false ? <i class="fas fa-2x fa-caret-down onHvrGrey" onClick={()=>ShowMore('snacks')}></i> : <i class="fas fa-2x fa-caret-up onHvrGrey" onClick={()=>ShowMore('snacks')}></i>}
                                </div>
                                <div className={showSnacks== false ? "hide": ""}>
                                    <div class="form-group  mb-3">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username"
                                            onChange={handleSearchInputChange("snacks")}
                                            // value={searchVegInput} 
                                            value={searchSnacksInput} 
                                            aria-describedby="basic-addon2"/>
                                            <div class="input-group-append">
                                                <span class="input-group-text" id="basic-addon2">
                                                    <i class="fas fa-plus mt-1 grey" onClick={()=>addToMyList(searchSnacksInput, 'snacks')}></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            {showSnacksItems.map(item=>
                                            <li class="list-group-item" onClick={()=>addToMyList(item, 'snacks')} >{item} </li>
                                            )}
                                        </div>
                                    </div>
                                    <ul class="list-group groceryListGroup">
                                        {snacksList.map((snacks, idx)=>
                                            {
                                                return(
                                                <div className="groceryListItm d-flex justify-content-between">
                                                    {snacks.checked == false ? 
                                                    <i class="cursor fas fa-circle mt-1" onClick={checkBox('snacks', snacks.id)}></i> 
                                                    :
                                                    <i class="fas fa-check-circle mt-1 green" onClick={checkBox('snacks', snacks.id)}></i> }
                                                    <p>{snacks.item ? snacks.item : snacks.itemName}</p>
                                                    <input className="fruitInp"
                                                    key={`amnt-${idx}`}
                                                    style={{width: '30%'}} type="number" name="amount" value={snacks.amount} onChange={updateFieldChanged(idx, 'snacks')}/>
                                                    <i class="fas fa-times mt-1 cursor timesIcn" onClick={()=>deleteFromMyList(snacks.id)}></i>
                                                </div>
                                                )}
                                            )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="others">
                        <div className="card groceryCrdWdth mr-2 mb-2">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex">
                                        <img src={Others} className="groceryImg" alt=""/>
                                        <h3 className="text-center pt-4 pl-2">Miscellaneous</h3>
                                    </div>
                                </div>
                                <hr style={{margin:'0'}}/>
                                <div className="text-center">
                                    {showOthers === false ? <i class="fas fa-2x fa-caret-down onHvrGrey" onClick={()=>ShowMore('others')}></i> : <i class="fas fa-2x fa-caret-up onHvrGrey" onClick={()=>ShowMore('others')}></i>}
                                </div>
                                <div className={showOthers=== false ? "hide": ""}>
                                    <div class="form-group  mb-3">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username"
                                            onChange={handleSearchInputChange("others")}
                                            // value={searchVegInput} 
                                            value={searchOthersInput} 
                                            aria-describedby="basic-addon2"/>
                                            <div class="input-group-append">
                                                <span class="input-group-text" id="basic-addon2">
                                                    <i class="fas fa-plus mt-1 grey" onClick={()=>addToMyList(searchOthersInput, 'others')}></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            {showOthersItems.map(item=>
                                            <li class="list-group-item" onClick={()=>addToMyList(item, 'others')} >{item} </li>
                                            )}
                                        </div>
                                    </div>
                                    <ul class="list-group groceryListGroup">
                                        {othersList.map((others, idx)=>
                                            {
                                                return(
                                                <div className="groceryListItm d-flex justify-content-between">
                                                    {others.checked == false ? 
                                                    <i class="cursor fas fa-circle mt-1" onClick={checkBox('others', others.id)}></i> 
                                                    :
                                                    <i class="fas fa-check-circle mt-1 green" onClick={checkBox('others', others.id)}></i> }
                                                    <p>{others.item ? others.item : others.itemName}</p>
                                                    <input className="fruitInp"
                                                    key={`amnt-${idx}`}
                                                    style={{width: '30%'}} type="number" name="amount" value={others.amount} onChange={updateFieldChanged(idx, 'others')}/>
                                                    <i class="fas fa-times mt-1 cursor timesIcn" onClick={()=>deleteFromMyList(others.id)}></i>
                                                    {/* <i class="fas fa-times mt-1 cursor" onClick={()=>deleteFromMyList(snacks.id)}></i> */}
                                                </div>
                                                )}
                                            )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="card container-fluid">
                <div className="row">
                    <div className="col-md-6" style={{borderRight: '1px solid #d2d5e0'}}>
                        <h4>My Shopping List</h4>
                        <hr/>
                        <ul class="list-group">
                            {myShoppingList.map((listItem, idx)=>
                            listItem.completed===false ?
                                shoppingDetail ===listItem._id ?
                                <li class="list-group-item cursor" style={{background: '#ad9fcc'}} onClick={()=>showShoppingDetail(listItem._id)}>{listItem.tittle}</li> 
                                : 
                                <li class="list-group-item cursor"  onClick={()=>showShoppingDetail(listItem._id)}>{listItem.tittle}</li> 
                                : '' )}
                            
                        </ul>
                        <hr/>
                        <ul class="list-group">
                            
                            {myShoppingList.map((listItem, idx)=>
                            listItem.completed===true ?
                                shoppingDetail ===listItem._id ?
                                <li class="list-group-item cursor" style={{background: '#ad9fcc'}} onClick={()=>showShoppingDetail(listItem._id)}>{listItem.tittle}</li> 
                                : 
                                <li class="list-group-item cursor"  style={{background: '#5d5868'}}  onClick={()=>showShoppingDetail(listItem._id)}>{listItem.tittle}</li> 
                                : '' )}
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h4>Detail</h4>
                        <hr/>
                        <div class="list-group">
                            {myShoppingList.map((listItem, idx)=>
                                shoppingDetail === listItem._id ?
                                <div class="list-group">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex justify-content-between">
                                            <h5 className="mr-3">{listItem.tittle}</h5>
                                            <p >{listItem.list.length} items</p>
                                        </div>
                                        <i className="myBtn fas fa-trash-alt cursor" onClick={()=>deleteShoppingList(listItem._id)}></i>
                                    </div>
                                    <ul className="list-group">
                                    {listItem.list.map((list, idx)=>
                                        <div class="list-group-item justify-content-between d-flex">
                                            <p className="col-6">{list.ItemName}</p>
                                            <p className="col-4">{list.ItemAmount}</p>
                                            {list.done=== true?
                                            <i class="fas fa-check-square" style={{color: "#ab73da"}}></i> :
                                            <i class="far fa-square" style={{color: "#ab73da"}}></i>
                                            }
                                        </div>
                                    )}
                                    </ul>
                                </div> :
                                ''
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroceryList
