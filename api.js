class api {
    constructor(){
        this.host = "https://localhost:4999/api/";
    }

    get(modelName, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", this.host + modelName, true); // true for asynchronous 
        xmlHttp.send(null);
    }

    put(modelName, id, data, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 204)
                callback();
        }
        xmlHttp.open("PUT", this.host + modelName + "/"+id, true); // true for asynchronous 
        xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xmlHttp.send(JSON.stringify(data));
    }

    delete(modelName, id, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("DELETE", this.host + modelName + "/"+id, true); // true for asynchronous 
        xmlHttp.send(null);
    }

    post (modelName, data, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 201)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("POST", this.host + modelName + "/", true); // true for asynchronous 
        xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xmlHttp.send(JSON.stringify(data));
    }
    
}


