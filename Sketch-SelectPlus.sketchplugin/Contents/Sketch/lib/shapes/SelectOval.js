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
    var ovalLayers = [];

    selection.forEach(layer => {
        Utilz.filter.ovalShapes(layer, ovalLayers);       
    });

    var total = ovalLayers.length;
    if(total == 0) {
        doc.showMessage("No Oval shapes.");
        return
    }
    
    Utilz.helper.clearSelection(context) 
    Utilz.helper.selectLayers(ovalLayers) 
    doc.showMessage(total+" Oval(s) selected.");
}