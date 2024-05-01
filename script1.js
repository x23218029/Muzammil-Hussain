var selectedRow = null

function onFormSubmit(e) {
	event.preventDefault();
                                                                          
        if (document.getElementById("productCode").value.trim() === '' || // Check if all form fields are filled
        document.getElementById("product").value.trim() === '' ||
        document.getElementById("qty").value.trim() === '' ||
        document.getElementById("perPrice").value.trim() === '') {
        alert("Please Fill all the fields first");
        return;
    }
        var formData = readFormData();
        if (formData === null) {                                       // If error occurs during form data then return null
            return;
        }
        if (selectedRow == null){
            insertNewRecord(formData);
		}
        else{
            updateRecord(formData);
		}
        resetForm();    
}

function readFormData() {                                            // Retrieve Data
  var formData = {};
  formData["productCode"] = document.getElementById("productCode").value.trim();
  formData["product"] = document.getElementById("product").value.trim();
  formData["qty"] = parseInt(document.getElementById("qty").value.trim());
  formData["perPrice"] = parseFloat(document.getElementById("perPrice").value.trim());
  if (formData["productCode"] === '' || formData["product"] === '' || isNaN(formData["qty"]) || isNaN(formData["perPrice"])) { 
      alert("All fields are required to fill with valid values with specified inputs only"); // Input Validation
      return null; 
  }
  if (!/^[A-Z0-9]{3}$/.test(formData["productCode"])) {
      alert("Poduct Code Should be in three digit number format xxx");  // Input Validation
      return null;
  }
  if (!/^[a-zA-Z\s]*$/.test(formData["product"])) {
      alert("Product name should be letters and spaces only");    // Input Validation
      return null;
  }
  if (formData["qty"] < 0 || formData["qty"] > 100) {
      alert("Quantity must be between 0 and 100");                // Input Validation
      return null;
  }

  if (formData["perPrice"] < 0 || formData["perPrice"] > 1000) {
      alert("Price must be between 0 and 1000");                  // Input Validation   
      return null;
  }
  return formData;
}

                                                                   
function insertNewRecord(data) {                                  //Insert the data
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
		cell1.innerHTML = data.productCode;
    cell2 = newRow.insertCell(1);
		cell2.innerHTML = data.product;
    cell3 = newRow.insertCell(2);
		cell3.innerHTML = data.qty;
    cell4 = newRow.insertCell(3);
		cell4.innerHTML = data.perPrice.toFixed(2);
    // cell4 = newRow.insertCell(4);
    //     cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
    validateRow(newRow);                   // Perform output validation
}
                                                                       
function resetForm() {                                          //Reset the data
    document.getElementById("productCode").value = '';
    document.getElementById("product").value = '';
    document.getElementById("qty").value = '';
    document.getElementById("perPrice").value = '';
    selectedRow = null;
}
                                                          
function validateRow(row) {                                   // Perform output validation for a table row
    var cells = row.cells;
    var productCode = cells[0].innerHTML;
    var product = cells[1].innerHTML;
    var qty = parseInt(cells[2].innerHTML);
    var perPrice = parseFloat(cells[3].innerHTML);

                                                           
    if (!/^[A-Z0-9]{3}$/.test(formData["productCode"])) {     // Check if Output product code is in the correct format
        alert("Invalid product code format: " + productCode);
        return;
    }

                                                         
    if (!/^[a-zA-Z\s]*$/.test(formData["product"])) {         // Check if output product name contains only letters and spaces
        alert("Invalid product name: " + product);
        return;
    }

                                                         
    if (formData["qty"] < 0 || formData["qty"] > 100) {     // Check if output product quantity is within the valid range
        alert("Invalid quantity: " + qty);
        return;
    }

                                                         
    if (formData["perPrice"] < 0 || formData["perPrice"] > 1000) {  // Check if output product price is within the valid range
        alert("Invalid price: " + perPrice);
        return;
    }
}

                                                          
function logout() {                                            //For Logout
    localStorage.removeItem('user');
}