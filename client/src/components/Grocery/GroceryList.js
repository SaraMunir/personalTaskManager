import React from 'react'

function GroceryList() {
    return (
        <div className="row container mx-auto pt-2">
            <div className="card groceryCrdWdth mr-2 mb-2">
                <div className="card-body">
                    <div className="d-flex">
                        <img src="./assets/FRUITS.png" className="groceryImg" alt=""/>
                        <h5 className="text-center">Fruits</h5>
                    </div>
                    <form action="">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <ul class="list-group">
                            <li class="list-group-item">
                                <div className="d-flex justify-content-between">
                                    <p>Apple</p>
                                    <input type="email" class=" col-4 form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="amnt"/>
                                    <i class="fas fa-plus mt-1 grey"></i>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div className="d-flex justify-content-between">
                                    <p>Cras justo odio</p>
                                    <i class="fas fa-check-circle mt-1"></i>
                                </div>
                            </li>
                            <li class="list-group-item">Morbi leo risus</li>
                            <li class="list-group-item">Porta ac consectetur ac</li>
                            <li class="list-group-item">Vestibulum at eros</li>
                        </ul>
                    </form>
                </div>
            </div>
            <div className="card groceryCrdWdth mr-2 mb-2">
            <img src="./assets/VEGETABLES.png" className="groceryImg" alt=""/>
                <h5 className="text-center">Vegetables</h5>
            </div>
            <div className="card groceryCrdWdth mr-2 mb-2">
                <img src="./assets/spices.png" className="groceryImg" alt=""/>
                <h5 className="text-center">Spices</h5>
            </div>
            <div className="card groceryCrdWdth mr-2 mb-2">
                <img src="./assets/riceBags.png" className="groceryImg" alt=""/>
                <h5 className="text-center">Dry Pantry</h5>
            </div>
            <div className="card groceryCrdWdth mr-2 mb-2">
                <img src="./assets/refrigerator.png" className="groceryImg" alt=""/>
                <h5 className="text-center">Refrigerated Items </h5>
            </div>
            <div className="card groceryCrdWdth mr-2 mb-2">
                <img src="./assets/protein.png" className="groceryImg" alt=""/>
                <h5 className="text-center">Proteins</h5>
            </div>
            <div className="card groceryCrdWdth mr-2 mb-2">
                <img src="./assets/toiletries.png" className="groceryImg" alt=""/>
                <h5 className="text-center">Home Essentials </h5>
            </div>
            <div className="card groceryCrdWdth mr-2 mb-2">
                <img src="./assets/snack.png" className="groceryImg" alt=""/>
                <h5 className="text-center">Snacks</h5>
            </div>
        </div>
    )
}

export default GroceryList
