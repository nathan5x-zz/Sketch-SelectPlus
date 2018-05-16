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
    var rectLayers = [];

    selection.forEach(layer => {
        Utilz.filter.rectShapes(layer, rectLayers);       
    });

    var total = rectLayers.length;
    if(total == 0) {
        doc.showMessage("No Rectangle shapes.");
        return
    }
    
    Utilz.helper.clearSelection(context) 
    Utilz.helper.selectLayers(rectLayers) 
    doc.showMessage(total+" Rectangle(s) selected.");
}