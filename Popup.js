class GridPopup {
    constructor(gridModel, saveFunction, cancelFunction) {
        this.id = "gridPopup";
        this.gridModel = gridModel;
        this.saveFunction = saveFunction;
        this.cancelFunction = cancelFunction;
    }

    render() {
        var div = document.createElement("div");
        div.className = "popup";
        div.id=this.id;

        for (var i = 0; i < this.gridModel.columns.length; i++) {
            var column = this.gridModel.columns[i];
            div.appendChild(column.renderEdit());
        }
        var saveButton = document.createElement("button");
        saveButton.onclick = this.saveFunction;
        saveButton.style.float = "right";
        var cancelFunction = document.createElement("button");
        cancelFunction.style.float = "right";
        cancelFunction.onclick = this.cancelFunction;

        div.appendChild(saveButton);
        div.appendChild(cancelFunction);

        return div;
        

    }
    
    show() {
        var div = document.getElementById(this.id);
        div.style.display = "block";
    }
    close() {
        ///find and delete div
    }





}