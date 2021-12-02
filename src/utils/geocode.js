const request = require('request');

const geocode = (location, callback) => {

    // encodeURI allows locations with special characters. 
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(location) + '.json?access_token=pk.eyJ1Ijoic2FwcGhpcmVneXBzeSIsImEiOiJja3VvYzNnNDg0YTNnMm5xbGgwMnNveXZwIn0.y-3D2xU_h5UDtl6U9Bi_iQ'

    request ({url, json:true}, (error, {body}) => {
        if (error){
            // don't have to provide the second argument, if left off it will be undefined by default. 
            callback("Unable to connect to location services.", undefined);
        } else if (body.message|| body.features.length === 0){
            callback("Unable to find location. Try another search.", undefined);
        } else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
};

module.exports = geocode;


//mapbox pwd - jTPebwPt4q52y8x
// mapbox api key - pk.eyJ1Ijoic2FwcGhpcmVneXBzeSIsImEiOiJja3VvYzNnNDg0YTNnMm5xbGgwMnNveXZwIn0.y-3D2xU_h5UDtl6U9Bi_iQ
//https://api.mapbox.com/ 