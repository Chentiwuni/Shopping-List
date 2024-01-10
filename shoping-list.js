let itemsContainer = document.getElementById('items-container');
let totalContainer = document.getElementById('total-container');

//function for creating item name
function createItemName(itemText) {
    //create item name div
    let itemNameDiv = document.createElement("div");
    itemNameDiv.classList.add('col-6', 'mt-3');

    //create item element 
    let itemNameEl = document.createElement('input');
    itemNameEl.classList.add('form-control', 'border-0',);
    itemNameEl.type = "text";
    itemNameEl.disabled = true;

    //append item element to item name div
    itemNameDiv.appendChild(itemNameEl);

    itemNameEl.value = itemText;
    
    return itemNameDiv;
}

//function for creating item price
function createPrice(qty,price) {
    let priceDiv = document.createElement('div');
    priceDiv.classList.add('col-3', 'mt-3');

    //create price element
    let priceEl = document.createElement('input');
    priceEl.classList.add('form-control', 'border-0', 'sub-totals', 'text-center');
    priceEl.type = "text";
    priceEl.disabled = true;

    //append item price to item price div
    priceDiv.appendChild(priceEl);

    priceEl.value = qty * price;

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
    editActDiv.classList.add('col-10', 'col-md-6');

    //create edit element
    let editEl = document.createElement('button');
    editEl.classList.add('bg-success', 'border', 'rounded', 'action-btn', 'edit-btn');
    editEl.innerHTML = "UPDATE";

    //create remove action div
    let removeActDiv = document.createElement('div');
    removeActDiv.classList.add('col-10', 'col-md-6');

    //create remove action element
    let removeEl = document.createElement('button');
    removeEl.classList.add('bg-danger', 'border', 'rounded', 'action-btn', 'remove-btn');
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
    let addItemField = document.getElementById('add-item-field');//access add item field
    let addQtyField = document.getElementById('add-qty-field');//access the qty field
    let addPriceField = document.getElementById('add-price-field');//access the price field

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
    
    let qty = parseFloat(document.getElementById('add-qty-field').value);
    let price = parseFloat(document.getElementById('add-price-field').value);

    let itemSubTotalPrice = createPrice(qty, price);

    let actionBtns = createActionButtons();

    itemsWrapper.appendChild(itemName);
    itemsWrapper.appendChild(itemSubTotalPrice);
    itemsWrapper.appendChild(actionBtns);

    itemsContainer.appendChild(itemsWrapper);

    //set the three input fields to empty after each time item is added
    addItemField.value = "";
    addQtyField.value = "";
    addPriceField.value = "";

    addItemField.focus();//set item name input field to focus

    //display total container which holds sub totals totals
    totalContainer.classList.remove('total-container');

    addSubTotals();//call this function to add sub totals
    }
    
}

//function for adding sub totals
function addSubTotals() {
    let subTotalEl = document.querySelectorAll('.sub-totals');//get sub total element
    let totalFigure = 0;
    subTotalEl.forEach((subTotal)=> {
        totalFigure += parseFloat(subTotal.value);
    })
    let totalEl = document.getElementById('total-figure');
    totalEl.innerHTML = totalFigure;

}

//function for editing items
function editItems(e) {
    if (e.target.classList.contains('edit-btn')) {
        //access the parent element "wrapper"
        let itemsWraper = e.target.parentElement.parentElement.parentElement.parentElement;
        itemNameInput = itemsWraper.querySelector('.form-control');//access item field

        let priceInput = itemsWraper.querySelector('.sub-totals');//access sub totals field

        //checks if item name field is empty
      if (itemNameInput.value === "") {
        alert('Item name field must not be empty')
        return;
      }
        //checks if sub total field is a valid number
        if (isNaN(parseFloat(priceInput.value))) {
            alert('Price field cannot be empty and must be a number');
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
             //access the parent element "wrapper"
        let itemsWraper = e.target.parentElement.parentElement.parentElement.parentElement;
        itemsContainer.removeChild(itemsWraper);

        addSubTotals();

        if (itemsContainer.children.length === 0) {
            totalContainer.classList.add('total-container');
        }
        }
    }
}

//set up even listeners
itemsContainer.addEventListener('click', editItems);
itemsContainer.addEventListener('click', removeItem);