class PrettyPrinter {
    createTable(jsonObjects){
        let headerKeys = Object.keys(jsonObjects[0]);
        let table = document.createElement('table')
        table.append(
                this.generateTableHeader(headerKeys),
                this.generateTableBody(headerKeys,jsonObjects)
        );
        return table;
    }

    prettyPrint(jsonObjects){
        let table = this.createTable(jsonObjects);
        document.querySelector('#root').append(table);
    }

    generateTableHeader(keys){
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

    generateTableBody(keys, jsonObjects){
        let tbody = document.createElement('tbody');
        tbody.append(...this.generateRows(keys,jsonObjects));
        return tbody;
    }

    generateRows(keys,jsonObjects){
        return jsonObjects.map((jsonObject)=>{
            let row = document.createElement('tr');
            row.append(...this.generateColumns(keys, jsonObject));
            return row;
        });
    }


    generateColumns(keys, jsonObject){
        return keys.map((key)=>{
            let column = document.createElement('td');
            column.innerHTML = jsonObject[key] || "-";
            return column;
        });
    }

    fetchData(url){
        return fetch(url).then((res)=>{
            return res.json();
        })
    }

    init(url){
        this.fetchData(url)
            .then((res)=>{
                this.prettyPrint(res)
            })
            .catch((error)=>{
                console.log("something went wrong",error)
                document.querySelector('#root').innerHTML = "Seems like there was some issue. Please try reloading or checking your network."
            })
    }
}

module.exports = PrettyPrinter;