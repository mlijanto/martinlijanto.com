const time = {
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening'
}

const sun = {
    sunrise: 'sunrise',
    sunset: 'sunset'
}

/**
 * Get time of day using hour
 * @name getTime
 * @return {time}
 */
function getTime() {
    let currentTime = time.afternoon;
    let hour = new Date().getHours();

    if (hour < 12) {
        currentTime = time.morning;
    } else if (hour > 18) {
        currentTime = time.evening;
    };

    return currentTime;
};

/**
 * Get sunrise or sunset state based on hour
 * @name getSunriseSunsetByHour
 * @return {sun}
 */
function getSunriseSunsetByHour() {
    if (getTime() === time.evening) {
        return sun.sunset;
    } else {
        return sun.sunrise;
    }
};

export {
    time,
    sun,
    getTime,
    getSunriseSunsetByHour
};