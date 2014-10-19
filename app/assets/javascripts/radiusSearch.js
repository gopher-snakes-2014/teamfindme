// function distance(obj) {
//     var R = 50; // km
//     var dLat = (obj.lat2 - obj.lat1) * Math.PI / 180;
//     var dLon = (obj.lon2 - obj.lon1) * Math.PI / 180;
//     var lat1 = obj.lat1 * Math.PI / 180;
//     var lat2 = obj.lat2 * Math.PI / 180;

//     var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//             Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//     var d = R * c;
//     var m = d * 0.621371;
//     return {
//         km: d,
//         m: m
//     };
// }

// var noteLocation = {
//     lat: 51.5171,
//     lon: -0.1062,
//     title: 'London'
// };

// var points = [
//     { lat: 52.4800, lon: -1.9100, title: 'Birmingham' },
//     { lat: 53.7500, lon: -0.3600, title: 'Hull' },
//     { lat: 52.2100, lon: 0.1300, title: 'Cambridge' },
//     { lat: 51.9000, lon: -0.2000, title: 'Stevenage' },
//     { lat: 51.1092, lon: -0.1872, title: 'Crawley' }
// ];
// var filtered = [], intPoint = 0, intPoints = points.length, dist = {}, point = {};
// for (intPoint = 0; intPoint < intPoints; intPoint = intPoint + 1) {
//     point = points[intPoint];
//     dist = distance({
//         lat1: noteLocation.lat,
//         lon1: noteLocation.lon,
//         lat2: point.lat,
//         lon2: point.lon
//     });
//     if (dist.km < 100) {
//         point.distance = dist.km;
//         filtered.push(point);
//     }
// }
// Ti.API.info('points: ' + JSON.stringify(filtered));
