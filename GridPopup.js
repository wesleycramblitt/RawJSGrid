//todo seed this.row with edit

class GridPopup {
    constructor(title, id, gridModel, grid, rowId, row, gridRowId, editMode) {
        this.title = title;
        this.id = id;
        this.gridModel = gridModel;
        this.row = row == undefined ? [] : row;
        this.grid = grid;
        this.rowId = rowId
        this.gridRowId = gridRowId;
        this.editMode = editMode;
    }

    saveFunction() {
        if (this.validate())
        {
            if (!this.editMode)
            {
                this.grid.addRow(this.data());
            }
            else
            {
                this.grid.editRow(this.rowId, this.gridRowId, this.data());
            }
        }
        this.close();
    }
    
    cancelFunction() {
        this.close();
    }

    render() {
        var div = document.createElement("div");

        var form = document.createElement("form");
        form.id = this.id+"form";
        form.style = "margin:1em;";

        div.className = "popup";
        div.id=this.id;
        div.style.margin = "1em";

        var heading = document.createElement("div");
        heading.style.height = "3em";
        heading.style.paddingLeft = "0.5em";
        heading.style.paddingTop = "0.5em";
        heading.style.backgroundColor = "rgb(70,70,70)";
        var h3 = document.createElement("h3");
        h3.innerText = this.title;
        h3.style = "margin:0; color:white";
        heading.appendChild(h3);
        div.appendChild(heading);
        div.appendChild(form);

        var leftDiv = document.createElement("div");
        leftDiv.style = "float:left; width:30%; text-align:left; ";

        var rightDiv = document.createElement("div");
        rightDiv.style = "float:left; width:70%; text-align:left;";

        form.appendChild(leftDiv);
        form.appendChild(rightDiv);
        for (var i = 0; i < this.gridModel.columns.length; i++) {
            var labelDiv = document.createElement("div");
            labelDiv.style = "height:40px";
            var inputDiv = document.createElement("div");
            inputDiv.style = "height:40px";
            var column = this.gridModel.columns[i];
            if (column.editable == false) {
                var hiddenInput = document.createElement("input");
                hiddenInput.type = "hidden";
                hiddenInput.name = column.name;
                hiddenInput.value = this.row[column.name] == undefined ? 
                column.defaultValue :  this.row[column.name];
                form.appendChild(hiddenInput);
                continue;
            }

            if (column.constructor == GridRelatedColumn)
            {
                column.renderGrid( this.row[column.name], form);
            }
            else
            {
                var label = document.createElement("label");
                label.innerText = column.label ;
                label.style = "padding:0";
                labelDiv.appendChild(label);
                leftDiv.appendChild(labelDiv);

                inputDiv.appendChild(column.renderEdit(this.row[column.name]));
                rightDiv.appendChild(inputDiv);

            }
            
        }
        var popup = this;
        var saveButton = document.createElement("input");
        if (saveButton.attachEvent)
            saveButton.attachEvent('onclick', function () { popup.saveFunction() } );
        else
            saveButton.addEventListener('click', function () { popup.saveFunction() } , false);
        
        saveButton.style = "position: absolute; bottom:5px; right:0";
        saveButton.value = "Save";
        saveButton.type = "button";
        var cancelButton = document.createElement("input");
        cancelButton.style = "position: absolute; bottom:5px; right:50px";
        cancelButton.value = "Cancel";
        cancelButton.type = "button";
        if (cancelButton.attachEvent)
            cancelButton.attachEvent('onclick', function () { popup.cancelFunction() } );
        else
            cancelButton.addEventListener('click', function () { popup.cancelFunction() } , false);

        form.appendChild(saveButton);
        form.appendChild(cancelButton);
        document.body.appendChild(div);

        var grayscreen = document.createElement("div");
        grayscreen.id = this.id + "grayscreen";
        grayscreen.style.backgroundColor = "rgba(100,100,100,0.5)";
        grayscreen.style.width = "100%";
        grayscreen.style.height = "10000px";
        grayscreen.style.position = "absolute";
        grayscreen.style.top = "0";
        grayscreen.style.left = "0";
        grayscreen.style.display = "none";
        document.body.appendChild(grayscreen);
        
        this.show();

    }
    
    show() {
        var div = document.getElementById(this.id);
        div.style.display = "block";

        var gscreen = document.getElementById(this.id+"grayscreen");
        gscreen.style.display = "block";
    }

    close() {
        var div = document.getElementById(this.id);
        document.body.removeChild(div);
        
        var gscreen = document.getElementById(this.id+"grayscreen");
        document.body.removeChild(gscreen);
    }

    validate() {
        return true;//todo finish
    }

    data() {
        var form = document.getElementById(this.id+"form");

        var data = form.serialize();
        return JSON.parse(data);
    }

}