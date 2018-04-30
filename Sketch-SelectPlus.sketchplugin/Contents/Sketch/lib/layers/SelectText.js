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
    var textLayers = [];

    selection.forEach(layer => {
        Utilz.filter.textLayers(layer, textLayers);       
    });

    var total = textLayers.length;
    if(total == 0) {
        doc.showMessage("No Text Layers");
        return
    }
    
    Utilz.helper.clearSelection(context) 
    Utilz.helper.selectLayers(textLayers) 
    doc.showMessage(total+" text layer(s) selected");
}