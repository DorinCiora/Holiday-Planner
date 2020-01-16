$(window).load(function() {
    if ('geolocation' in navigator) {
        //check geolocation available
        //try to get user current location using getCurrentPosition() method
        navigator.geolocation.getCurrentPosition(function(position) {
            searchID(position.coords);
        });
    } else {
        alert("Browser doesn't support geolocation!");
    }
});

searchID = coords => {
    fetch(
        `https://www.outdooractive.com/api/project/api-dev-oa/nearby/tour/jsonp?location=${coords.latitude},${coords.longitude}&radius=5000000`
    )
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data) {
                takeID(data.result);
                console.log(data.result[133]);
            } else {
                console.log("can't take data");
            }
        });
};

takeID = result => {
    fetch(
        `https://www.outdooractive.com/api/oois/jsonp/${result[0].id},${result[1].id},${result[2].id}?key=yourtest-outdoora-ctiveapi&display=list`
    )
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
};
