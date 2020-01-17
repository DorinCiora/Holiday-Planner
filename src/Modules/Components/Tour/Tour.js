$(window).load(function() {
    if ('geolocation' in navigator) {
        //check geolocation available
        //try to get user current location using getCurrentPosition() method
        navigator.geolocation.getCurrentPosition(function(position) {
            getCoords(position.coords);
        });
    } else {
        alert("Browser doesn't support geolocation!");
    }
});

getCoords = coords => {
    fetch(
        `https://www.outdooractive.com/api/project/api-dev-oa/nearby/tour/jsonp?location=${coords.latitude},${coords.longitude}&radius=5000000`
    )
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data) {
                getID(data.result);
                console.log('getCoords ', data.result);
            } else {
                console.log("can't take data");
            }
        });
};

getID = result => {
    fetch(
        `https://www.outdooractive.com/api/oois/jsonp/${result[0].id},${result[1].id},${result[2].id}?key=yourtest-outdoora-ctiveapi&display=list`
    )
        .then(response => response.json())
        .then(data => {
            console.log('getID() ', data);
            if (data) {
                getPoster(data.tour);
                let length = Math.round(data.tour[0].length) / 100 / 1000;
                let time = data.tour[0].time.min / 60;
                $('.tour-title').append(data.tour[0].title);
                $('.tour-length').append(Math.round(length * 100) + ' km');
                $('.tour-time').append(Math.round(time) + ' hours');
                $('.tour-ascent').append(data.tour[0].elevation.ascent + ' m');
            } else {
                console.log("can'\t find tour");
            }
        });
};

getPoster = tour => {
    fetch(`http://img.oastatic.com/img/${tour[0].primaryImage.id}/.jpg`)
        .then(response => response)
        .then(data => {
            console.log('getPoster ', data.url);
            $('.content-banner__card img').attr('src', data.url);
        });
};
