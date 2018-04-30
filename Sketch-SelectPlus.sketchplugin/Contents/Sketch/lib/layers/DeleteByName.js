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
    var name = Utilz.nativeUI.displayInput(doc, "Enter layer name to delete", "Rectangle");
    
    var nameLayers = [];

    selection.forEach(layer => {
        Utilz.filter.byName(layer, name, nameLayers);       
    });

    var total = nameLayers.length;
    if(total == 0) {
        doc.showMessage("No Layers named "+name);
        return
    }
    
    var dialog = Utilz.nativeUI.displayYesNoDialogWithMessage("Found "+total+" Layer(s). Do you want to delete?", "Do you want to delete?")
    var response = dialog.runModal();

    switch(response){
        case 1000: 
             Utilz.helper.clearSelection(context);
             Utilz.helper.removeLayers(nameLayers);
             break;
        case 1001: 
            return;   
    }   
}