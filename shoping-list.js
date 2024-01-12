const itemsContainer = document.getElementById('items-container');
const totalContainer = document.getElementById('total-container');
const addItemField = document.getElementById('add-item-field');//access add item field
const addQtyField = document.getElementById('add-qty-field');//access the qty field
const addPriceField = document.getElementById('add-price-field');//access the price field
const topTitle = document.querySelectorAll('.top-title');

//function for creating item name
function createItemName(itemText) {
    let itemNameDiv = document.createElement("div");
    itemNameDiv.classList.add('col-5', 'mt-3');

    //create item element 
    let itemNameEl = document.createElement('div');
    itemNameEl.classList.add('border-0', 'item-name');

    //append item element to item name div
    itemNameDiv.appendChild(itemNameEl);

    itemNameEl.innerHTML = itemText;
    
    return itemNameDiv;
}

//function for creating item quantity
function createItemQty(itemQty) {
    let itemQtyDiv = document.createElement("div");
    itemQtyDiv.classList.add('col-1', 'mt-3');

    //create item element 
    let itemQtyEl = document.createElement('div');
    itemQtyEl.classList.add('border-0');

    //append item element to item name div
    itemQtyDiv.appendChild(itemQtyEl);

    itemQtyEl.innerHTML = itemQty;
    
    return itemQtyDiv;
}

//function for creating item price
function createPrice(qty,price) {
    let priceDiv = document.createElement('div');
    priceDiv.classList.add('col-3', 'mt-3');

    //create price element
    let priceEl = document.createElement('div');
    priceEl.classList.add('border-0', 'sub-totals');

    //append item price to item price div
    priceDiv.appendChild(priceEl);

    priceEl.innerHTML = qty * price;

    return priceDiv;
}

//function for creating action buttons
function createActionButtons() {
    //create buttons col-3 grid div that contains action container
    let col3 = document.createElement('div');
    col3.classList.add('col-3', 'mt-3');

    //create action buttons container
    let actBtnCont = document.createElement('div');
    actBtnCont.classList.add('row', 'action-container');

    //create edit action div
    let editActDiv = document.createElement('div');
    editActDiv.classList.add('col-10', 'col-md-5', 'showme');

    //create edit element
    let editEl = document.createElement('button');
    editEl.classList.add('btn', 'btn-success', 'action-btn', 'edit-btn');
    editEl.type = "button";
    editEl.innerHTML = "UPDATE";

    //create remove action div
    let removeActDiv = document.createElement('div');
    removeActDiv.classList.add('col-10', 'col-md-5', 'showme');

    //create remove action element
    let removeEl = document.createElement('button');
    removeEl.classList.add('btn', 'btn-danger', 'action-btn', 'remove-btn');
    removeEl.type = "button";
    removeEl.innerHTML = "REMOVE";

    col3.appendChild(actBtnCont);
    actBtnCont.appendChild(editActDiv);
    actBtnCont.appendChild(removeActDiv);
    editActDiv.appendChild(editEl);
    removeActDiv.appendChild(removeEl);

    return col3;
}

//function for adding item list
function addList() {
    //check if add item field is empty
    if (addItemField.value === "") {
        alert('Add Item field must not be empty')
    } else if (addQtyField.value === "") {
        alert('Quantity field must not be empty')
    } else if (addPriceField.value === "") {
        alert('Price field must not be empty')
    } else if (isNaN(addQtyField.value)) {
        alert('Quantity field must be a number')
    } else if (isNaN(addPriceField.value)) {
        alert('Price field must be a number')
    } else {
        let itemsWrapper = document.createElement('div');
        itemsWrapper.classList.add('row', 'd-flex', 'align-items-center');

        let itemName = createItemName(addItemField.value); //create item name
        let itemQty = createItemQty(addQtyField.value);//create quantity value
    
    let qty = parseFloat(document.getElementById('add-qty-field').value);
    let price = parseFloat(document.getElementById('add-price-field').value);

    let itemSubTotalPrice = createPrice(qty, price);//create item price

    let actionBtns = createActionButtons();

    itemsWrapper.appendChild(itemName);
    itemsWrapper.appendChild(itemQty);
    itemsWrapper.appendChild(itemSubTotalPrice);
    itemsWrapper.appendChild(actionBtns);

    itemsContainer.appendChild(itemsWrapper);

    //set the three input fields to empty after each time item is added
    addItemField.value = "";
    addQtyField.value = "";
    addPriceField.value = "";

    addItemField.focus();//set item name input field to focus

    //show top titles
    topTitle.forEach(title => {
        title.classList.remove('remove');
    })

    //show items container
    if (itemsContainer.children.length === 3) {
        totalContainer.classList.remove('total-container');
    }

    addSubTotals();//call this function to add sub totals
    }
    
}

//function for adding sub totals
function addSubTotals() {
    let subTotalEl = document.querySelectorAll('.sub-totals');//get sub total element
    let totalFigure = 0;
    subTotalEl.forEach((subTotal)=> {
        totalFigure += parseFloat(subTotal.innerHTML);
    })
    let totalEl = document.getElementById('total-figure');
    totalEl.innerHTML = totalFigure;

}

//function for editing items
function editItems(e) {
    if (e.target.classList.contains('edit-btn')) {
        //access the grand parent element of edit element
        let editGParent = e.target.parentElement.parentElement.parentElement.parentElement;
        itemNameInput = editGParent.querySelector('.form-control');//access item field

        let priceInput = editGParent.querySelector('.sub-totals');//access sub totals field

        //checks if item name field is empty
      if (itemNameInput.value === "") {
        alert('Item name field must not be empty')
        itemNameInput.focus();
        return;
      }
        //checks if sub total field is a valid number
        if (isNaN(parseFloat(priceInput.value))) {
            alert('Price field cannot be empty and must be a number');
            priceInput.focus();
            return;//stops execution if condition is not met, returns to the calling code
        }

        itemNameInput.disabled = !itemNameInput.disabled;//toggles the item field
        priceInput.disabled = !priceInput.disabled;//toggles the sub total field

        if (!itemNameInput.disabled) {
            itemNameInput.focus(); // Set focus on itemNameInput if it is not disabled
        }
        
        addSubTotals();
    }
}

//function for removing items
function removeItem(e) {
    if (e.target.classList.contains('remove-btn')) {
        const confirmation = confirm('Are you sure you want to remove this item?');
        if (confirmation) {
             //access the grand parent element of remove element
        let removeGParent = e.target.parentElement.parentElement.parentElement.parentElement;
        itemsContainer.removeChild(removeGParent);

        addSubTotals();

        //hide total container
        if (itemsContainer.children.length === 2) {
            totalContainer.classList.add('total-container');
        }
        
        //hide top titles
        if (itemsContainer.children.length === 1) {
            topTitle.forEach(title => {
                title.classList.add('remove');
            })
        
        }
        }
    }
}

//set up even listeners
itemsContainer.addEventListener('click', editItems);
itemsContainer.addEventListener('click', removeItem);

//set event listener for "Enter key" on the add item input field
addItemField.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        addList();
    }
})

//set event listener for "Enter key" on the add quantity input field
addQtyField.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        addList();
    }
})

//set event listener for "Enter key" on the add price input field
addPriceField.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        addList();
    }
})

//set the input field of add item name to focus when the page is reloaded
addItemField.focus();