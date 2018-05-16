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
    var polygonLayers = [];

    selection.forEach(layer => {
        Utilz.filter.polygonShapes(layer, polygonLayers);       
    })    
        
    var total = polygonLayers.length;
    if(total == 0) {
        doc.showMessage("No Polygon shapes.");
        return
    }
    
    Utilz.helper.clearSelection(context);
    Utilz.helper.selectLayers(polygonLayers);
    doc.showMessage(total+" Polygon(s) selected.");
}