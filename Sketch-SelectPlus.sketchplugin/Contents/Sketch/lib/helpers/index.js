var Utilz = Utilz || {};

Utilz.helper = {
    clearSelection: function(context) {
        context.api().selectedDocument.selectedLayers.clear();
    },
    selectLayers: function(layers) {
        layers.forEach(layer => {
            layer.select_byExpandingSelection(true,true); 
        })
    }, 
    removeLayers: function(layers) {
        layers.forEach(layer => {
            layer.removeFromParent();
        })
    }, 
    /*
    * Courtesy of @darknoon
    * https://github.com/darknoon/sketchapp-json-plugin/blob/master/src/index.js
    */
    toJSON: function(sketchObject) {        
        if (!sketchObject) {
          return null;
        }
        const immutable = sketchObject.immutableModelObject();
        return JSON.parse(MSJSONDataArchiver.archiveStringWithRootObject_error_(immutable, null));
    }
}