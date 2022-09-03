class Utils {

    static getCurrentTimeStamp() {

        const timestamp = Date.now();
        const dateObject = new Date(timestamp);
        const date = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        const time = dateObject.getTime();

        return `${date}-${month}-${year}`;
    }

}

module.exports = Utils