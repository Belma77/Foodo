export function setDateAsCountdown(value: Date) {
    let now = new Date();
    let endDate = new Date(value);
    // get total seconds between the times
    var delta = (endDate.getTime() - now.getTime()) / 1000;

    if (delta < 0) return 'Ended';

    // calculate (and subtract) whole weeks
    var weeks = Math.floor(delta / 604800);
    delta -= weeks * 604800;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    if(minutes < 1)
        return '< Minute'

    let formatedDate = '';
    if (weeks > 0) formatedDate += weeks + ' Weeks ';
    if (days > 0) formatedDate += days + ' Days ';
    if (hours > 0 && (weeks === 0 || days === 0))
        formatedDate += hours + ' Hours ';
    if (weeks === 0 && days === 0 && hours === 0 && minutes > 0)
        formatedDate += minutes + ' minutes';

    return formatedDate;
}
