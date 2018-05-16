@import '../helpers/filter.js';
@import '../helpers/index.js';
@import '../helpers/native-ui.js';

var onRun = function (context) {    

    var doc = context.document;
    var selection = context.selection;
    var numSelectedItems = selection.count();
    
    //Return if there are no selected items
    if(numSelectedItems == 0) {
        doc.showMessage("Please select a layer Group/Artboard");
        return
    }

    var page = doc.currentPage();

    var _sharedStyles = doc.layerStyles().objects();
    if(_sharedStyles.count() <= 0) {
        doc.showMessage("No shared styles.");
        return
    }

    var styleList = [{
            "name": "Dummy",
            "objectID": "262626262"
        }];

    var dropDownData = ["Select"];
    
    _sharedStyles.forEach(style => {        
        var _styleName = style.name();
        var _styleObjectID = style.objectID();

        styleList.push({
            "name": _styleName,
            "objectID": _styleObjectID
        });
        dropDownData.push(_styleName);
    });
    
    var dialogData = Utilz.nativeUI.displayDialogWithDropDown(dropDownData, "Style Selection", "Choose layer style");

    if(dialogData == null) {
        return;
    }

    if(dialogData.selectedIndex == "" || dialogData.selectedIndex === 0) {
        doc.showMessage("Select correct Style to proceed.");
        return
    }
    
    var layerStyle = styleList[dialogData.selectedIndex];
    var styleLayers = [];

    selection.forEach(layer => {       
         Utilz.filter.filterLayersByStyle(layer, layerStyle.objectID, styleLayers);       
    });

    var total = styleLayers.length;
    if(total == 0) {      
        doc.showMessage("No layer(s) styled by the name: "+layerStyle.name);
        return;
    }
    
    Utilz.helper.clearSelection(context) 
    Utilz.helper.selectLayers(styleLayers);    
    doc.showMessage(total+" layer(s) named "+layerStyle.name+" selected");
}