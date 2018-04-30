@import '../helpers/filter.js';
@import '../helpers/index.js';

var onRun = function (context) {
    var doc = context.document;
    var page = doc.currentPage();
    var artboards = page.artboards();

    // Return if there are no selected items
    if(artboards.length == 0) {
        doc.showMessage("No Artboard(s) to select.");
        return
    }

    Utilz.helper.clearSelection(context);
    Utilz.helper.selectLayers(artboards);
}