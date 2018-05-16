var Utilz = Utilz || {};

const DialogWindow = {
    small: {
        WIDTH: 250,
        HEIGHT: 40,
        TYPE: "SMALL",
        view: {},
        dialogData: null
    },
    medium: {
        WIDTH: 250,
        HEIGHT: 80,
        TYPE: "MEDIUM",
        view: {},
        dialogData: null
    },
    large: {
        WIDTH: 250,
        HEIGHT: 150,
        TYPE: "LARGE",
        view: {},
        dialogData: null
    }    
}

Utilz.nativeUI = {
    displayInput : function (doc, message, placeholderText){
        var defaultText = placeholderText || "";
        return [doc askForUserInput:message initialValue:defaultText];
    },
    createDialog: function(title, yesBtnText, noBtnText, windowStyle) {
        var alertWindow = COSAlertWindow.new();        
        alertWindow.setMessageText(title)

        // Add dialog buttons
        alertWindow.addButtonWithTitle(yesBtnText);
        alertWindow.addButtonWithTitle(noBtnText);

        var viewWidth = windowStyle.WIDTH;
        var viewHeight = windowStyle.HEIGHT;       

        windowStyle.view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
        alertWindow.addAccessoryView(windowStyle.view);

        return alertWindow;
    },
    createDialogWithMessage: function(title, message, yesBtnText, noBtnText, windowStyle) {
        
        // Assign defaults
        windowStyle = windowStyle || DialogWindow.small;
        yesBtnText = yesBtnText || "Yes";
        noBtnText = noBtnText || "No";

        var dialog = this.createDialog(title, yesBtnText, noBtnText, windowStyle);
        //windowStyle.dialogData = NSUserDefaults.alloc().initWithSuiteName("com.nathan5x.sketch.utilz");

        //Add message
        var infoLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, 40, (windowStyle.WIDTH - 50), 35));
        infoLabel.setStringValue(message);
        infoLabel.setSelectable(false);
        infoLabel.setEditable(false);
        infoLabel.setBezeled(false);
        infoLabel.setDrawsBackground(false);

        windowStyle.view.addSubview(infoLabel);        
        return dialog;
    },
    displayYesNoDialogWithMessage: function(title, message, yesBtnText, noBtnText) {       
        var dialog = this.createDialogWithMessage(title, message, yesBtnText, noBtnText); 
        return [dialog][0];
    },
    displayDialogWithDropDown: function(dropdownData, title, message) {
        var currentWindow = DialogWindow.medium;
        var dialog = this.createDialogWithMessage(title, message, "Ok", "Cancel", currentWindow);

        var dropdownUI = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0, currentWindow.HEIGHT - 60, 150, 35));

        dropdownData.forEach(function(styleItem) {
            [dropdownUI addItemWithTitle:styleItem];
        });

        currentWindow.view.addSubview(dropdownUI);

        var modalHandler = [dialog][0];
        var modalResponse = modalHandler.runModal();
        var selectedIndex;

        switch(modalResponse) {
            case 1000:
                currentWindow.dialogData = {};
                selectedIndex = dropdownUI.indexOfSelectedItem();
                currentWindow.dialogData = {selectedIndex};
                break;
            case 1001:
                currentWindow.dialogData = null;
                break;
        }
        return currentWindow.dialogData;
    }
}