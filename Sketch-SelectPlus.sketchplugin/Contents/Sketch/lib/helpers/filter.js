@import './index.js';

var Utilz = Utilz || {};

Utilz.layer = {
    ARTBOARD: "MSArtboardGroup",
    GROUP: "MSLayerGroup",
    TEXT: "MSTextLayer",
    IMAGE: "MSBitmapLayer",
    SYMBOL: "MSSymbolInstance",    
    SVG: "MSShapePathLayer",
    BITMAP: "MSBitmapLayer"
}

Utilz.shape = {
    CLASS: "MSShapeGroup",
    RECTANGLE: "rectangle",
    TRIANGLE: "triangle",
    STAR: "star",
    OVAL: "oval",
    POLYGON: "polygon",
    LINE: 0,
    ARROW: 2,
    PATH_CLASS: "shapePath"
}

Utilz.filter = {
    byName: function(layer, name, array) {        
        return this.filterLayers(layer, name, array, true);
    },
    textLayers: function(layer, array) {        
        return this.filterLayers(layer, Utilz.layer.TEXT, array);
    },
    bitmapLayers: function(layer, array) {        
        return this.filterLayers(layer, Utilz.layer.BITMAP, array);
    },
    imageLayers: function(layer, array) {        
        return this.filterLayers(layer, Utilz.layer.IMAGE, array);
    },
    artboards: function(layer, array) {        
        return this.filterLayers(layer, Utilz.layer.ARTBOARD, array);
    },
    symbols: function(layer, array) {        
        return this.filterLayers(layer, Utilz.layer.SYMBOL, array);
    },
    shapes: function(layer, array) {        
        return this.filterLayers(layer, Utilz.shape.CLASS, array);
    },
    filterLayers: function(layer, layerType, array, byName) {
        var className = layer.className();
        if(className == layerType || (byName && layer.name().indexOf(layerType) != -1)) {                
            array.push(layer);
        } else if (className == Utilz.layer.GROUP || className == Utilz.layer.ARTBOARD) {
            var layers = layer.layers();
            var layersCount = layers.length;            

            if(layersCount == 0){
                return array;
            }
            
            layers.forEach( innerLayer => {               
                Utilz.filter.filterLayers(innerLayer, layerType, array, byName);
            })
        }        
        return array;
    },
    rectShapes: function(layer, array) {
        return this.filterShapes(layer, Utilz.shape.RECTANGLE, array); 
    },
    ovalShapes: function(layer, array) {
        return this.filterShapes(layer, Utilz.shape.OVAL, array); 
    },
    polygonShapes: function(layer, array) {
        return this.filterShapes(layer, Utilz.shape.POLYGON, array); 
    },
    triangleShapes: function(layer, array) {
        return this.filterShapes(layer, Utilz.shape.TRIANGLE, array); 
    },
    starShapes: function(layer, array) {
        return this.filterShapes(layer, Utilz.shape.STAR, array); 
    },
    filterShapes: function(layer, shapeType, array) {        
        var className = layer.className();       
        if(className == Utilz.shape.CLASS) {           
            var jsonStruct = Utilz.helper.toJSON(layer);
            var innerLayerClass = jsonStruct.layers && jsonStruct.layers[0] ? jsonStruct.layers[0]._class : "";            
            if(innerLayerClass == shapeType) {                
                array.push(layer); 
            }         
        } else if (className == Utilz.layer.GROUP || className == Utilz.layer.ARTBOARD) {
            var layers = layer.layers();
            var layersCount = layers.length;            

            if(layersCount == 0){
                return array;
            }
            
            layers.forEach( innerLayer => {               
                Utilz.filter.filterShapes(innerLayer, shapeType, array);
            })
        }        
        return array;
    },
    linePaths: function(layer, array) {
        return this.filterPaths(layer, Utilz.shape.LINE, array); 
    },
    arrowPaths: function(layer, array) {
        return this.filterPaths(layer, Utilz.shape.ARROW, array); 
    },
    filterPaths: function(layer, shapeType, array) {        
        var className = layer.className();       
        if(className == Utilz.shape.CLASS) {           
            var jsonStruct = Utilz.helper.toJSON(layer);    
            var innerLayerClass = "";
            var innerCurvePoints = 0;

            if(jsonStruct.layers && jsonStruct.layers[0]) {
                innerLayerClass = jsonStruct.layers[0]._class;
                innerCurvePoints = jsonStruct.layers[0].points.length;
            }
           
            var innerStyleDecoration = jsonStruct.style ? jsonStruct.style.endDecorationType : -1;
            if(innerLayerClass == Utilz.shape.PATH_CLASS && innerStyleDecoration == shapeType && innerCurvePoints == 2) {                
                array.push(layer); 
            }         
        } else if (className == Utilz.layer.GROUP || className == Utilz.layer.ARTBOARD) {
            var layers = layer.layers();
            var layersCount = layers.length;            

            if(layersCount == 0){
                return array;
            }
            
            layers.forEach( innerLayer => {               
                Utilz.filter.filterPaths(innerLayer, shapeType, array);
            })
        }        
        return array;
    },
    filterLayersByStyle: function(layer, sharedObjectID, array) {
        var className = layer.className();
        if(layer.className() == Utilz.layer.TEXT) {
            return array;
        }

        // Do not Destrut TEXT Layers as the comparison happens only on Layer styles
        var jsonStruct = Utilz.helper.toJSON(layer.style());
        var _layerSharedStyleID = jsonStruct && jsonStruct.sharedObjectID ? jsonStruct.sharedObjectID  : -1;

        if(_layerSharedStyleID != -1 && sharedObjectID == _layerSharedStyleID) {
            array.push(layer);
        }

        if (className == Utilz.layer.GROUP || className == Utilz.layer.ARTBOARD) {
            var layers = layer.layers();
            var layersCount = layers.length;

            if(layersCount == 0){
                return array;
            }

            layers.forEach( innerLayer => {
                Utilz.filter.filterLayersByStyle(innerLayer, sharedObjectID, array);
            })
        }
        return array;
    }
}