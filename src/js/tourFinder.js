/**
 * The method that get the user Geolocation, if the user open the Tour Finder page.
 */

$(document).ready(function() {
    if (window.location.pathname == '/tour-finder.html') {
        if ('geolocation' in navigator) {
            //check geolocation available
            //try to get user current location using getCurrentPosition() method
            navigator.geolocation.getCurrentPosition(function(position) {
                getToursIDs(position.coords);
            });
        } else {
            alert("Browser doesn't support geolocation!");
        }
    }
});

/**
 * The method that get the tours IDs.
 */

getToursIDs = coords => {
    fetch(
        `https://www.outdooractive.com/api/project/api-dev-oa/nearby/tour/jsonp?location=${coords.latitude},${coords.longitude}&radius=5000000`
    )
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data) {
                getTours(data.result);
                console.log('getToursIDs ', data);
            } else {
                console.log("can't take data");
            }
        });
};

/**
 * The method that get the first 3 tours for preview on the Tour Finder Page.
 */

getTours = result => {
    fetch(
        `https://www.outdooractive.com/api/oois/jsonp/${result[0].id},${result[1].id},${result[2].id}?key=yourtest-outdoora-ctiveapi&display=list`
    )
        .then(response => response.json())
        .then(data => {
            console.log('getTours() ', data);
            getPoster(data.tour);
            formatTour(data.tour);
        });
};

/**
 * The method that get the tour poster.
 * I don't know how to apply to each tour the tour Primary Image. I've try to change the source of the images
 * but it is overwritting the source till the end of forEach tour.
 */

getPoster = tour => {
    let primaryImage = [];
    tour.forEach(tour => {
        let primaryImageId = tour.primaryImage.id;

        fetch(`http://img.oastatic.com/img/${primaryImageId}/.jpg`)
            .then(response => response)
            .then(data => {
                //imageUrl.push(data.url);
                primaryImage = `<img class="card__tour-image" src="${data.url}" alt="${tour.primaryImage.title}" />`;
                $('img.card__tour-image').attr('src', data.url);
            });
    });
    return primaryImage;
};

/**
 * The method that is formating the tour information and display them.
 */

formatTour = tour => {
    let tourImage = getPoster(tour);
    let image = tourImage.length;
    console.log('tourImage', tourImage);
    console.log('image', image);
    tour.forEach(tour => {
        let length = Math.round(tour.length) / 100 / 1000;
        let time = tour.time.min / 60;
        let tourTitle = tour.title;
        let tourLength = Math.round(length * 100) + ' km';
        let tourTime = Math.round(time) + ' hours';
        let tourAscent = tour.elevation.ascent + 'm';
        $('.card-wrapper').append(
            '<div class="card-tour"><img class="card__tour-image" src="" alt="" /><p class="card-tour__title">' +
                tourTitle +
                '</p><div class="card-tour__length"><div class="length-icon"></div><p class="length-info">Length:' +
                tourLength +
                '</p></div><div class="card-tour__time"><div class="time-icon"><p class="time-info">Duration:' +
                tourTime +
                '</p></div></div><div class="card-tour__ascent"><div class="ascent-icon"><p class="ascent-info">Ascention:' +
                tourAscent +
                '</p></div></div>'
        );
    });
};
