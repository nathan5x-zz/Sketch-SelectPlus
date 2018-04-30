@import '../helpers/filter.js';
@import '../helpers/index.js';

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
    
    Utilz.helper.clearSelection(context) 
    Utilz.helper.selectLayers(symbols) 
    doc.showMessage(total+" symbol(s) selected");
}