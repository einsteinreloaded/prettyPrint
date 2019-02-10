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

function fetchData(url){
    return fetch(url).then((res)=>{
        return res.json();
    })
}

function init(url){
    fetchData(url)
        .then((res)=>{
            prettyPrint(res)
        })
        .catch((error)=>{
            console.log("something went wrong",error)
            document.querySelector('#root').innerHTML = "Seems like there was some issue. Please try reloading or checking your network."
        })
}

init(url);