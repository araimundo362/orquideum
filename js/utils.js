export class Utils {

    constructor() {}
    
    checkNombre = (nombre) => {
        return nombre.length > 0 ? true : false;
    }

    checkDni = (dni) => {
        return (dni.length == 8 || dni.length == 7) ? true : false;
    }

    checkAge = (age) => {
        return age >= 18 ? true : false;
    }

    checkMail = (mail) => {
        return mail.length > 0 && (mail.includes('@hotmail.com') || mail.includes('@gmail.com') || mail.includes('@yahoo.com.ar')) ? true : false; 
    }

    checkPayment = (payNumber) => {
        return payNumber.length == 12 || payNumber.length == 16 ? true : false;
    }

    checkExpirationMonth = (month) => {
        return month.length == 2 && month > 0 && month <= 12 ? true : false;
    }

    checkExpirationYear = (year) => {
        return year.length == 2 && year > 21 && year <= 50? true : false;
    }
}