let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let searchMood = 'title';
let temp;
// get total
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value)
            - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#7c0000'
    }
}

// create product
let dataPro;
if (localStorage.products != null) {
    dataPro = JSON.parse(localStorage.products)
} else {
    dataPro = [];
}
submit.onclick = function () 
{
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != '' &&
        price.value != '' &&
        category.value != '' &&
        newPro.count < 100) {
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let index = 0; index < newPro.count; index++) {
                    dataPro.push(newPro)

                }
            } else {
                dataPro.push(newPro);
                clearData();
            }

        } else {
            dataPro[temp] = newPro;
            count.style.display = 'block';
            submit.innerHTML = 'Create';
            mood = 'create';
        }

    }
    // save localstorage
    localStorage.setItem('products', JSON.stringify(dataPro));
    clearData()
    showData();
}



// clear inputs
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";

}
// read

function showData() {
    getTotal()
    let table = "";
    for (let index = 0; index < dataPro.length; index++) {
        table +=
            `<tr>
            <td>${index + 1}</td>
            <td>${dataPro[index].title}</td>
            <td>${dataPro[index].price}</td>
            <td>${dataPro[index].taxes}</td>
            <td>${dataPro[index].ads}</td>
            <td>${dataPro[index].discount}</td>
            <td>${dataPro[index].category}</td>
            <td>${dataPro[index].total}</td>
            <td><button onclick="updateData(${index})" id="update">update</button></td>
            <td><button onclick="deleteData(${index})" id="delete">delete</button></td>

        </tr>
    `;

    }

    document.getElementById('tbody').innerHTML = table;

    let deleteBtn = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        deleteBtn.innerHTML = `
        <button onclick="deleteAll()">delete All(${dataPro.length})</button>
        `
    } else {
        deleteBtn.innerHTML = '';
    }

}
showData();


// delete
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.products = JSON.stringify(dataPro);
    showData();
}

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}
// count
// update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'update';
    category.value = dataPro[i].category;
    mood = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth"

    })

}
// search
let searchInput = document.getElementById('search');
function searchData(id) {
    if (id == 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    searchInput.placeholder = 'search by' + searchMood;
    searchInput.focus();
    searchInput.value = '';
    showData();

}


function search(value) 
{
    let table = '';
    for (let index = 0; index < dataPro.length; index++) 
    {
        if (searchMood == 'title') {

            if (dataPro[index].title.toLowerCase().includes(value.toLowerCase())) {
                table +=
                    `<tr>
                <td>${index}</td>
                <td>${dataPro[index].title}</td>
                <td>${dataPro[index].price}</td>
                <td>${dataPro[index].taxes}</td>
                <td>${dataPro[index].ads}</td>
                <td>${dataPro[index].discount}</td>
                <td>${dataPro[index].category}</td>
                <td>${dataPro[index].total}</td>
                <td><button onclick="updateData(${index})" id="update">update</button></td>
                <td><button onclick="deleteData(${index})" id="delete">delete</button></td>
    
            </tr>
        `;

            }
        }
        else {
            if (dataPro[index].category.includes(value.toLowerCase())) {
                table +=
                    `<tr>
                        <td>${index}</td>
                        <td>${dataPro[index].title}</td>
                        <td>${dataPro[index].price}</td>
                        <td>${dataPro[index].taxes}</td>
                        <td>${dataPro[index].ads}</td>
                        <td>${dataPro[index].discount}</td>
                        <td>${dataPro[index].category}</td>
                        <td>${dataPro[index].total}</td>
                        <td><button onclick="updateData(${index})" id="update">update</button></td>
                        <td><button onclick="deleteData(${index})" id="delete">delete</button></td>
            
                    </tr>
                `;
            }
        }
    }

    document.getElementById('tbody').innerHTML = table;
}






// clear data