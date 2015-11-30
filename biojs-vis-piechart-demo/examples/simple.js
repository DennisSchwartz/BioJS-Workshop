// if you don't specify a html file, the sniper will generate a div with id "rootDiv"

var App = require("biojs-vis-piechart-demo");

var pieChart = new App(
    {
        el: rootDiv,
        sequence: 'TAGCATGAC'
    }
);