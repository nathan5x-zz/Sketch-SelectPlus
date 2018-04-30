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
    var triangleLayers = [];

    selection.forEach(layer => {
        Utilz.filter.triangleShapes(layer, triangleLayers);       
    });

    var total = triangleLayers.length;
    if(total == 0) {
        doc.showMessage("No Triangle Shapes");
        return
    }
    
    Utilz.helper.clearSelection(context) 
    Utilz.helper.selectLayers(triangleLayers) 
    doc.showMessage(total+" Triangle(s) selected");
}