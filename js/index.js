// Converts numeric degrees to radians
function toRad(Value) 
{
    return Value * Math.PI / 180;
}

var R = 6371; // km

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) 
{
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
}

import("../pkg/index.js").then(module => {
    document.getElementById('run-js').onclick = function() {
        var t0 = performance.now();
    
        var sum = 0.0;
        var x1 = Math.random() * 360;
        var x2 = Math.random() * 360;
        var y1 = Math.random() * 180 - 90;
        var y2 = Math.random() * 180 - 90;

        for (var i = 0; i < 1000000; ++i) {
            sum += calcCrow(x1, y1, x2, y2);
        }
    
        var t1 = performance.now();
    
        document.getElementById("results").innerHTML = "JS took " + (t1 - t0) + "ms (sum=" + sum + ")";
    };
    
    document.getElementById('run-wasm').onclick = function() {
        var t0 = performance.now();
    
        var sum = 0;
        var x1 = Math.random() * 360;
        var x2 = Math.random() * 360;
        var y1 = Math.random() * 180 - 90;
        var y2 = Math.random() * 180 - 90;

        for (var i = 0; i < 1000000; ++i) {
            sum += module.distance(x1, y1, x2, y2);
        }
    
        var t1 = performance.now();
    
        document.getElementById("results").innerHTML = "Wasm took " + (t1 - t0) + "ms (sum=" + sum + ")";
    };
}).catch(console.error);