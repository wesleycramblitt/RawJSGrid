document.writeln("<script type='text/javascript' src='Grid.js'></script>");
document.writeln("<script type='text/javascript' src='GridPopup.js'></script>");
document.writeln("<script type='text/javascript' src='GridModelFactory.js'></script>");

window.onload = function () {
    bindComponents();
}

function bindComponents() {
    for (var i = 0; i <  document.body.childNodes.length; i++)
    {
        var node = document.body.childNodes[i];
        if (node.dataset != undefined) {
            if (node.dataset.component != undefined)
            {
                switch (node.dataset.component) {
                    case "grid":
                        bindGrid(node);
                    break;
                }
            }
        }
        
    }
}

function bindGrid(node) {
    if (node.dataset.model == undefined)
    {
        alert("bindGrid failed. data-model undefined");
        return;
    }

    var gridModel = GridModelFactory.getGridModel(node.dataset.model);
    
    var grid = new Grid(node.id + node.dataset.model,gridModel, node, new api);
    grid.read();

}

HTMLElement.prototype.serialize = function(){
    var obj = {};
    var elements = this.querySelectorAll( "input, select, textarea" );
    for( var i = 0; i < elements.length; ++i ) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;
        if (element.type != undefined && element.type == "checkbox") {
            value = element.checked;
        }
        //Grid is stored in hidden
        if (element.type != undefined && element.type == "hidden" && element.value != "undefined")
        {
            value = JSON.parse(element.value);
        }
        if( name ) {
            obj[ name ] = value;
        }
    }
    return JSON.stringify( obj );
}