export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]


export const getDateAndTime = (timestamp: string | Date) => {
    const date = new Date(`${timestamp}`);

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();


    const time = new Date(`${timestamp}`).toLocaleTimeString()


    if (month && day && year && time) {
        return `${month} ${day}, ${year}. ${time}`;
    }

    return 'N/A'
};

export const getDate = (timestamp: string | Date) => {
    const date = new Date(`${timestamp}`);

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    if (month && day && year)
        return `${day} ${month} ${year}`;

    return 'N/A'
};

export const getTime = () => {

}

export const getMonth = () => {
    const month = new Date().getMonth()
    return months[month]
}