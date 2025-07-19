/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import fs from "fs";
import inquirer from "inquirer";
import qr from "qr-image";

let siteAdress;

inquirer.prompt([
    {
        type: 'input',
        name: 'siteAdress',
        message: 'What is the site adress?'
    }
])  
.then((answer) => {
    siteAdress = answer.siteAdress;
    //console.log('Site adress: ' + siteAdress);
    const qr_png = qr.image(siteAdress, {type: 'png'});
    const siteName = siteAdress.split('.')[1];
    qr_png.pipe(fs.createWriteStream(`qr-codes-png/qr_${siteName}.png`));

    fs.writeFile('site.txt', siteAdress, (error) => {
        if(error) throw error;
        console.log("Site adress saved to site.txt!")
    })
})
.catch((error) => {
    console.log('Error: ' + error);
});


