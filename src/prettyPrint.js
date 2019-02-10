class PrettyPrinter {

    createTable(jsonObjects){
        if(jsonObjects && jsonObjects.length>0){
            let headerKeys = Object.keys(jsonObjects[0]);
            let table = document.createElement('table')
            table.append(
                    this.generateTableHeader(headerKeys),
                    this.generateTableBody(headerKeys,jsonObjects)
            );
            return table;
        }
        return 0;
    }

    prettyPrint(jsonObjects,el){
        let table = this.createTable(jsonObjects);
        if (!table){
            table = "There is no data to display";
        }
        let root = document.querySelector(el);
        root.innerHTML = '';
        root.append(table);
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

    init(url, el){
        this.fetchData(url)
            .then((res)=>{
                this.prettyPrint(res, el)
            })
            .catch((error)=>{
                console.log("something went wrong",error)
                document.querySelector(el).innerHTML = "Seems like there was some issue. Please try reloading or checking your network."
            })
    }
}

module.exports = PrettyPrinter;