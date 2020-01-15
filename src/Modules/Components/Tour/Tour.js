var lat = [];
var alt = [];

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(extractPosition);
    } else {
        x.innerHTML = 'Geolocation is not supported by this browser.';
    }
}

function extractPosition(position) {
    var a = position.coords.latitude;
    var b = position.coords.longitude;
}

$.ajax({
    url:
        'https://www.outdooractive.com/api/project/api-dev-oa/nearby/tour/jsonp?location=13.404954,52.52000659999999&radius=100000',
    data: data,
    success: success,
    dataType: dataType
});

function getTours() {
    fetch(
        `https://www.outdooractive.com/api/project/api-dev-oa/nearby/tour/jsonp?location=${extractPosition}.${52000659999999}&radius=100000`
    )
        .then(response => {
            return response.json();
        })
        .then(myJson => {
            console.log(myJson);
        });
}
