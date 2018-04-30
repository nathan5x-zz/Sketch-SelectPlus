@import '../helpers/filter.js';
@import '../helpers/index.js';
@import '../helpers/native-ui.js';

var onRun = function (context) {    

    var doc = context.document;
    var selection = context.selection;
    var numSelectedItems = selection.count();
    
    // Return if there are no selected items
    if(numSelectedItems == 0) {
        doc.showMessage("Please select a layer Group/Artboard");
        return
    }

    var page = doc.currentPage();
    var symbols = [];

    selection.forEach(layer => {
        Utilz.filter.symbols(layer, symbols);       
    })    
    
    var total = symbols.length;
    if(total == 0) {
        doc.showMessage("No symbols");
        return
    }
    
    var dialog = Utilz.nativeUI.displayYesNoDialogWithMessage("Found "+total+" Symbol(s). Do you want to delete?", "Do you want to delete?", "Yes", "No")
    var response = dialog.runModal();

    switch(response){
        case 1000: 
             Utilz.helper.clearSelection(context);
             Utilz.helper.removeLayers(symbols);
             break;
        case 1001: 
            return;   
    }   
}