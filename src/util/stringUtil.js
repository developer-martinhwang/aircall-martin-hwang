function convertTimeFromIsoToLocale(str){
    if(str) 
    {
        const date = new Date(str);
        const localeDate = date.toLocaleString('en-US', {
            timeZone: 'America/New_York',
            year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
        })
        return localeDate;
    }
}
function splitWithComma(str){
    if(str)
    {
        const resultArr = str.split(",");
        return resultArr;
    }
}
export {convertTimeFromIsoToLocale, splitWithComma};