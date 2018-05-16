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
    var linePaths = [];

    selection.forEach(layer => {
        Utilz.filter.linePaths(layer, linePaths);       
    })    
        
    var total = linePaths.length;
    if(total == 0) {
        doc.showMessage("No Lines.");
        return
    }
    
    Utilz.helper.clearSelection(context);
    Utilz.helper.selectLayers(linePaths);
    doc.showMessage(total+" Line(s) selected");
}