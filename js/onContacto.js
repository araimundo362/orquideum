
$('#myButton').click( () => {
    let nombre =  $('#inputName').val();
    let mail = $('#inputEmail').val();
    let consulta = $('#exampleFormControlTextarea1').val();

    if (nombre.length > 0 && consulta.length > 0 && mail.length > 0 && (mail.includes('@hotmail.com') || mail.includes('@gmail.com') || mail.includes('@yahoo.com.ar'))) {
        $('#inputName').css("border-color", "lightblue");
        $('#exampleFormControlTextarea1').css("border-color", "lightblue");
        $('#inputEmail').css("border-color", "lightblue");

        let success = `
            <div>
                <p style="color: blue"; font-size: 20px; margin: 0"> La consulta se ha enviado </p>
            </div>
        `
        $('#succesAlert').html(success);
    } else {
        if( nombre.length <= 0) {
            $('#inputName').css("border-color", "red");
            let nameError = `
            <div>
                <p style="color: red"; font-size: 5px; margin: 0 !important">Por favor, ingrese su nombre</p>
            </div>
        `
        $('#nameErrorAlert').html(nameError);
        };
        if (consulta.length <= 0) {
            $('#exampleFormControlTextarea1').css("border-color", "red");
            $('#inputName').css("border-color", "red");
            let consultaError = `
            <div>
                <p style="color: red"; font-size: 5px; margin: 0 !important">Por favor, ingrese su consulta.</p>
            </div>
        `
        $('#consultaErrorAlert').html(consultaError);
        };
        if (mail.length <= 0 ) {
            $('#inputEmail').css("border-color", "red");
            let mailError = `
            <div>
                <p style="color: red"; font-size: 5px; margin: 0 !important">Por favor, ingrese su email.</p>
            </div>
        `
        $('#mailErrorAlert').html(mailError);
        }
        if (mail.length && !(mail.includes('@hotmail.com') || mail.includes('@gmail.com') || mail.includes('@yahoo.com.ar'))) {
            $('#inputEmail').css("border-color", "red");
            let mailInvalidError = `
            <div>
                <p style="color: red"; font-size: 5px; margin: 0 !important">Por favor, ingrese un email valido.</p>
            </div>
        `
        $('#mailErrorAlert').html(mailInvalidError);
        }
    }
})

