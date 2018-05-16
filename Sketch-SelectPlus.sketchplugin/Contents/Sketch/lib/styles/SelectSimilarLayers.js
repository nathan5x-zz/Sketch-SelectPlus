@import '../helpers/filter.js';
@import '../helpers/index.js';
@import '../helpers/native-ui.js';

var onRun = function (context) {    

    var doc = context.document;
    var selection = context.selection;
    var numSelectedItems = selection.count();
    
    //Return if there are no selected items
    if(numSelectedItems == 0) {
        doc.showMessage("Please select a layer.");
        return
    }

    //Return if there are more than one selected items
    if(numSelectedItems > 1) {
        doc.showMessage("Please select a single layer.");
        return
    }

    var page = doc.currentPage();
    var selectedLayer = selection[0];
    var className = selectedLayer.className(); 

    // Return if the selected layer is Group or Artboard
    if(className == Utilz.layer.GROUP || className == Utilz.layer.ARTBOARD) {
        doc.showMessage("Please select non-group/non-artboard layer.");
        return
    }

    // Return if the selected layer is Group or Artboard
    var jsonStruct = Utilz.helper.toJSON(selectedLayer.style());
    var layerSharedStyleID = jsonStruct && jsonStruct.sharedObjectID ? jsonStruct.sharedObjectID  : -1;
    if(layerSharedStyleID == -1) {
        doc.showMessage("Layer doesn't have a shared style.");
        return
    }

    var activeArtboard = doc.currentPage().currentArtboard();
    var styleLayers = [];

    // Get the similar layers from the current Artboard
    Utilz.filter.filterLayersByStyle(activeArtboard, layerSharedStyleID, styleLayers);

    var total = styleLayers.length;
    if(total == 0) {      
        doc.showMessage("No similar layer(s).");
        return;
    }

    /* 
     * Find the layer's shared style name as the layer 
     * doesn't have the Shared Style name by default,
     */
    var _sharedStyles = doc.layerStyles().objects();
    var _numSharedStyles = _sharedStyles.count();
    if(_numSharedStyles <= 0) {
        doc.showMessage("No shared styles.");
        return;
    }

    var _styleName = "";
    for (var i = 0; i < _numSharedStyles; i++) {        
		if (_sharedStyles.objectAtIndex(i).objectID() == layerSharedStyleID) {
            _styleName = _sharedStyles.objectAtIndex(i).name();
            break;
		}
    }

    Utilz.helper.clearSelection(context) 
    Utilz.helper.selectLayers(styleLayers);    
    doc.showMessage(total+" layer(s) named "+_styleName+" selected");
}