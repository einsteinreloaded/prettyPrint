const url = 'https://s3.ap-south-1.amazonaws.com/hiring-challenge/code-sample.json'


function createTable(jsonObjects){
    headerKeys = Object.keys(jsonObjects[0]);
    let table = document.createElement('table')
    table.append(
            generateTableHeader(headerKeys),
            generateTableBody(headerKeys,jsonObjects)
    );
    return table;
}

function prettyPrint(jsonObjects){
    let table = createTable(jsonObjects);
    document.querySelector('#root').append(table);
}

function generateTableHeader(keys){
    let thead = document.createElement('thead');
    thead.append(
        ...keys.map((key)=>{
            let headColumn = document.createElement('th');
            headColumn.innerHTML = key;
            return headColumn;
        })
    )
    return thead;
}

function generateTableBody(keys, jsonObjects){
    let tbody = document.createElement('tbody');
    tbody.append(...generateRows(keys,jsonObjects));
    return tbody;
}

function generateRows(keys,jsonObjects){
    return jsonObjects.map((jsonObject)=>{
        let row = document.createElement('tr');
        row.append(...generateColumns(keys, jsonObject));
        return row;
    });
}


function generateColumns(keys, jsonObject){
    return keys.map((key)=>{
        let column = document.createElement('td');
        column.innerHTML = jsonObject[key] || "-";
        return column;
    });
}


function init(url){
    fetch(url)
        .then((res)=>{
            res.json().then((data)=>{
                prettyPrint(data)
            })
        })
        .catch((error)=>{
            console.log("something went wrong",error)
        })
}

init(url);