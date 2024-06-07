export const setLocationObject = (locationObj, coordsObj) => {
    const {lat, lon, name, unit} = coordsObj;
    locationObj.setLat(lat);
    locationObj.setLon(lon);
    locationObj.setName(name);
    if (unit) {
        locationObj.setUnit(unit);
    };
};

export const getHomeLocation = () => {
    return localStorage.getItem("defaultWeatherLocation");
};

export const getWeatherFromCoords = async (locationObj) => {
    /* const lat = locationObj.getLat();
    const lon = locationObj.getLon();
    const units = locationObj.getUnit();
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${apiKey}`
    try {
        const weatherStream = await fetch(url);
        const weatherJson = await weatherStream.json();
        return weatherJson;
    } catch (err) {
        console.log(err);
    } */

    const urlDataObj = {
        lat: locationObj.getLat(),
        lon: locationObj.getLon(),
        units: locationObj.getUnit()
    };
    try {
        const weatherStream = await fetch(`./.netlify/functions/get_weather`, {
            method: "POST",
            body: JSON.stringify(urlDataObj)
        });
        const weatherJson = await weatherStream.json();
        return weatherJson;
    } catch (err) {
        console.log(err);
    }
};

export const getCoordsFromApi = async (entryText, units) => {
    /* let url;
    const regex = /^\d+$/g;
    const flag = regex.test(entryText) ? "zip" : "q";
    if (flag === "zip") {
        url = `http://api.openweathermap.org/geo/1.0/zip?zip=${entryText}&appid=${apiKey}`
    } else {
        url = `http://api.openweathermap.org/geo/1.0/direct?q=${entryText}&appid=${apiKey}`
    }
    const encodedURL = encodeURI(url);
    try {
        const dataStream = await fetch(encodedURL);
        const jsonData = await dataStream.json();
        return jsonData;
    } catch (err) {
        console.error(err.stack);
    } */

    const urlDataObj = {
        text: entryText,
        units: units
    };

    try {
        const dataStream = await fetch(`./.netlify/functions/get_coords`, {
            method: "POST",
            body: JSON.stringify(urlDataObj)
        });
        const jsonData = await dataStream.json();
        return jsonData;
    } catch (err) {
        console.error(err);
    }
};

export const cleanText = (text) => {
    const regex = / {2,}/g;
    const entryText = text.replaceAll(regex, " ").trim();
    return entryText;
};