module.exports.otptemplate = (otp) => {
    return `
    <body style="background-color: black;">
    <div style="text-align: center;">
    <br>
    <h1 style="color: red;"> SHARECENTER </h1> 
     
    <h2 style="background-color: aliceblue;">OTP VERIFICATION</h2>
    <p style="color: aliceblue; text-align: center">
    Enter <strong>${otp}</strong> to Verify 
    <br>
    </p>
    <br>
    </div>
    </body>`
}