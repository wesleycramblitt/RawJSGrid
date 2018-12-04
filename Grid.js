class GridModel {
    constructor(name, heading, rowId) {
        this.name = name;
        this.heading = heading;
        this.columns = []; //array of gridcolumns
        this.rowId = rowId;
        this.editable = true;
        this.allowCreate = true;
        this.allowDelete = true;
    }
}

class GridColumn {
    constructor(name, defaultValue, label, editable, visible) {
        this.name = name;
        this.defaultValue = defaultValue;
        this.label = label;
        this.editable = editable;
        this.visible = visible;
    }

    render(value) {
        return value;
    }

    renderEdit(value) {
        if (this.editable == false) {
            return;
        }
        var input = document.createElement("input");
        switch (typeof(this.defaultValue)) {
            case "number":
                input.type = "number";
            break;
            case "boolean":
                input.type = "checkbox";
            break;
            case "string":
            default:
                input.type="text";
            break;
        }

        input.name = this.name;
        if (value != undefined && value != null)
        {
            if (input.type == "checkbox")
            {
                input.checked = value;
            }
            else
            {
                input.value = value;
            }
        }

        return input;
    }

}

class GridRelatedColumn extends GridColumn {
    constructor(name, defaultValue, label, editable, visible, relatedGridModel) {
        super(name, defaultValue, label, editable, visible);
        this.visible = false;
        this.relatedGridModel = relatedGridModel;
        
    }

    renderGrid(values, node) {
        //create Grid and read based on column name value
        if (values == undefined || values == null)
        {
            values = [];
        }

        var relatedGrid = new Grid(this.name, this.relatedGridModel, node, null, values);

        relatedGrid.render();
    }
}

class GridEnumColumn extends GridColumn {
    constructor(name, defaultValue, label, editable, visible, selectList) {
        super(name, defaultValue, label, editable, visible);
        this.selectList = selectList;
    }

    render(value) {
        return this.selectList[value];
    }

    renderEdit(value) {
        if (this.editable == false) {
            return;
        }
        var selectList = document.createElement("select");
        selectList.name = this.name;
        for (var i = 0; i < this.selectList.length; i++) {
            var option = document.createElement("option");
            option.value = i.toString();
            option.text = this.selectList[i];
        
            selectList.appendChild(option);
        }
        if (value != undefined && value != null) {
        selectList.selectedIndex = value;
        }
        return selectList;
    }
}



class Grid {

constructor(id,gridModel, node, api, rows) {
    this.id = id;
    this.gridModel = gridModel;
    this.node = node;
    this.api = api;
    this.rows = rows;
}

render() {
     var oldGrid = document.getElementById(this.id+"grid");
     var gridDiv = null;
     if (oldGrid != null)
     {
         while (oldGrid.firstChild) {
            oldGrid.removeChild(oldGrid.firstChild);
        }
        gridDiv = oldGrid;
     }
     else
     {
        gridDiv = document.createElement("div");
        gridDiv.id = this.id+"grid";
        this.node.appendChild(gridDiv);
     }
     var hidden = document.createElement("input");

     hidden.type = "hidden";
     hidden.name = this.id;
     hidden.value = JSON.stringify(this.rows);
     var heading = document.createElement("h2");
     var table  = document.createElement("table");
     var theader  = document.createElement("thead");
     var tbody = document.createElement("tbody");
     var tr = document.createElement("tr");

     heading.innerText = this.gridModel.heading;

     var toolbar = document.createElement("div");
     
     var createButton = document.createElement("input");
     createButton.type="button";
     createButton.value = "Create";
     createButton.onclick = this.create.bind(this);

     toolbar.appendChild(createButton);

     gridDiv.appendChild(hidden);

     gridDiv.appendChild(heading);

     gridDiv.appendChild(toolbar);

     for (var i = 0; i < this.gridModel.columns.length; i++) {
        var gridColumn = this.gridModel.columns[i];
        if (gridColumn.visible == false)
        {
            continue;
        }
        var th = document.createElement("th");
        th.innerText = gridColumn.label;
        th.style.padding = "0.5em";

        tr.appendChild(th);
        
     }

    var th = document.createElement("th");

    tr.appendChild(th);
    

     theader.appendChild(tr);
     table.appendChild(theader);
     table.appendChild(tbody);
     gridDiv.appendChild(table)
     for(var i = 0; i < this.rows.length; i++) {
         tr = document.createElement("tr");
         for (var j = 0; j < this.gridModel.columns.length; j++) {
            var gridColumn = this.gridModel.columns[j];
            if (gridColumn.visible == false)
            {
                continue;
            }
            var td = document.createElement("td");

            td.innerText =  gridColumn.render(this.rows[i][gridColumn.name]);
            tr.appendChild(td);
         }
         var td = document.createElement("td");
         var editButton = document.createElement("input");
         editButton.type = "button";
         editButton.value = "Edit";
         var grid = this;
         
         editButton.id = i.toString();
         editButton.addEventListener("click", function () { grid.edit(this.id)},false);
         editButton.innerText = "Edit";
         td.appendChild(editButton);
         tr.appendChild(td);

         
         var deleteButton = document.createElement("input");
         deleteButton.type = "button";
         deleteButton.value = "Delete";
         deleteButton.id = i.toString();
         deleteButton.addEventListener("click", function () {grid.delete(this.id)},false); 
         deleteButton.innerText = "Delete";
         td.appendChild(deleteButton);
         tbody.appendChild(tr);
     }


}

read() {
    var grid = this;
    if (this.api != null && this.api != undefined)
    {
        this.api.get(this.gridModel.name, function (response) {
            grid.rows = JSON.parse(response);
            grid.render();
        });
    }
    else
    {
        grid.render();
    }
}

edit(gridRowId) {
    var row = this.rows[gridRowId];
    var rowId = row[this.gridModel.rowId];
    var p = new GridPopup("Edit "+this.gridModel.heading,this.id+"edit",this.gridModel, this, rowId, row, gridRowId,  true);
    p.render();
}

delete(rowId) {
    var row = this.rows[rowId];
    var id = row[this.gridModel.rowId];
    var grid = this;
    if (confirm("Delete this bastard?")) {
        if (this.api) {

        this.api.delete(this.gridModel.name, id, function (response) {
            grid.read();
        })
        }
        else
        {
            this.rows.splice(rowId, 1);
            this.render();
        }
    }
}

create() {
    var p = new GridPopup("Create "+this.gridModel.heading, this.id+"create",this.gridModel, this, null, null, null, false);
    p.render();
}

addRow(row) {
    if (this.api)
    {
        var grid = this;
        this.api.post(this.gridModel.name, row, function (response) {       
            grid.read();
        });
    }
    else
    {
        this.rows.push(row);
        this.render();
    }

}

editRow(id, rowId, row) {
    if (this.api)
    {
        var grid = this;
        this.api.put(this.gridModel.name, id, row, function () {       
            grid.read();
            
        });
    }
    else
    {
        this.rows[rowId] = row;
        this.render();
    }

}

}