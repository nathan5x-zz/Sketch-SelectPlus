@import './external/refs.js';

var Utilz = Utilz || {};

function starGithub(context) {
    [[NSWorkspace sharedWorkspace] openURL:[NSURL URLWithString:Utilz.refs.STAR_GITHUB]];
}

function showVersion(context) {
    [[NSWorkspace sharedWorkspace] openURL:[NSURL URLWithString:Utilz.refs.VERSION]];
}

function openBugWindow(context) {
    [[NSWorkspace sharedWorkspace] openURL:[NSURL URLWithString:Utilz.refs.BUG_URL]];
}

function openGuide(context) {
    [[NSWorkspace sharedWorkspace] openURL:[NSURL URLWithString:Utilz.refs.GUIDE_URL]];
}

function sendFeedback(context) {
    [[NSWorkspace sharedWorkspace] openURL:[NSURL URLWithString:Utilz.refs.FEEDBACK_URL]];
}