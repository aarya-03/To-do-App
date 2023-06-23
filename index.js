let add = document.getElementById('addItemBtn');
add.addEventListener('click', getAndUpdate);

//Function to update the list automatically when page gets loaded
function getAndUpdate() {
    console.log("Updating List....");
    let tit = document.getElementById('title').value;
    let desc = document.getElementById('description').value;
    if (tit == '') {
        alert('Title cannot be empty.');
        return;
    }
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    } else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    update();
}

//Function to update the list when item is added by user
function update() {
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    } else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    //populate the table
    let tBody = document.getElementById('tableBody');
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
            <td>${index + 1}</td>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>
                <button class="taskDelete" onclick="taskDelete(${index})"><i class="fa-solid fa-circle-check"></i></button>
            </td>
        </tr>
        `;
    });
    tBody.innerHTML = str;
}
update();  // so that update() is called when script is initialized

// Function to delete particular task
function taskDelete(taskNumber) {
    console.log("Deleting Task No. ", taskNumber + 1);
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    //Deleting row at specific task Number
    itemJsonArray.splice(taskNumber, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}

//Function to Clear the whole list
function clearList() {
    localStorage.clear();
    update();
}
