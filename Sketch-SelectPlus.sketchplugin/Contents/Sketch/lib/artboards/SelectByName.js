@import '../helpers/filter.js';
@import '../helpers/index.js';
@import '../helpers/native-ui.js';

var onRun = function (context) {
    var doc = context.document;
    var page = doc.currentPage();
    var artboards = page.artboards();

    // Return if there are no selected items
    if(artboards.length == 0) {
        doc.showMessage("No Artboard(s) to select.");
        return
    }

    var name = Utilz.nativeUI.displayInput(doc, "Enter Artboard name to select", "Artboard");
    if(null == name){       
        return
    }

    if(name == ""){
        doc.showMessage("Enter correct name to select.");
        return
    }

    var namesArtboards = [];
    
    artboards.forEach(artboard => {
        if(name && artboard.name().indexOf(name) != -1) {
            namesArtboards.push(artboard);
        }
    });

    var total = namesArtboards.length;
    if(total == 0) {
        doc.showMessage("No Artboard(s) named "+name);
        return
    }
    
    Utilz.helper.clearSelection(context) 
    Utilz.helper.selectLayers(namesArtboards);    
    doc.showMessage(total+" Artboard(s) named or contains "+name+" selected.");
}