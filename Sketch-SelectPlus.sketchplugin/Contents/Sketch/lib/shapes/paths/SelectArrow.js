@import '../../helpers/filter.js';
@import '../../helpers/index.js';

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
    var arrowPaths = [];

    selection.forEach(layer => {
        Utilz.filter.arrowPaths(layer, arrowPaths);       
    })    
        
    var total = arrowPaths.length;
    if(total == 0) {
        doc.showMessage("No Arrows.");
        return
    }
    
    Utilz.helper.clearSelection(context);
    Utilz.helper.selectLayers(arrowPaths);
    doc.showMessage(total+" Arrow(s) selected");
}