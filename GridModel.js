
class GridModel {
    constructor() {
        this.columns = []; //array of gridcolumns
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

}

class relatedGridColumn extends GridColumn {
    constructor(name, defaultValue, label, editable, visible, relatedGridModel) {
        super(name, defaultValue, label, editable, visible);
        this.relatedGridModel = relatedGridModel;
    }
}

class enumGridColumn extends GridColumn {
    constructor(name, defaultValue, label, editable, visible, selectList) {
        super(name, defaultValue, label, editable, visible);
        this.selectList = selectList;
    }
}