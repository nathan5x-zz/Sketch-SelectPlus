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
    var bitmapLayers = [];

    selection.forEach(layer => {
        Utilz.filter.bitmapLayers(layer, bitmapLayers);       
    })    
        
    var total = bitmapLayers.length;
    if(total == 0) {
        doc.showMessage("No Bitmap Layers");
        return
    }
    
    var dialog = Utilz.nativeUI.displayYesNoDialogWithMessage("Found "+total+" Bitmap(s). Do you want to delete?", "Do you want to delete?", "Yes", "No")
    var response = dialog.runModal();

    switch(response){
        case 1000: 
             Utilz.helper.clearSelection(context);
             Utilz.helper.removeLayers(bitmapLayers);
             break;
        case 1001: 
            return;   
    }   
}