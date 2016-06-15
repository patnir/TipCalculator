var gSalesTaxPercent;
var gTipPercent;

function body_load() {
    btnTipPreTax.onmousedown = preTax_onemousedown;
    btnTipOnTotal.onmousedown = tipTotal_onmousedown;
    gSalesTaxPercent =  ditStorageGet('stp', 7);
    gTipPercent = ditStorageGet('tp', 15);
    gSalesTaxPercent
    document.getElementById("txtSalesTaxPercent").value = convertNumberToString(gSalesTaxPercent);
    document.getElementById("txtTipAmountPercent").value = convertNumberToString(gTipPercent);
}

function convertNumberToString(number) {
    number = Math.round(number * 100) / 100;
    if (number % 1 === 0) {
        return number.toString() + ".00";
    }
    return number.toString();
}


function preTax_onemousedown(event) {
    if (validateInput() === false) {
        return;
    }

    var checkAmount = parseFloat(document.getElementById("txtCheckAmount").value.trim());
    gTipPercent = parseFloat(document.getElementById("txtTipAmountPercent").value.trim());
    gSalesTaxPercent = parseFloat(document.getElementById("txtSalesTaxPercent").value.trim());
    var salesTaxAmount = checkAmount - checkAmount * (100 / (100 + gSalesTaxPercent));
    var tipAmount = checkAmount * (100 / (100 + gSalesTaxPercent)) * gTipPercent / 100;

    document.getElementById("txtSalesTaxAmount").value = convertNumberToString(salesTaxAmount);
    document.getElementById("txtTipAmount").value = convertNumberToString(tipAmount);

    storeSalesTipPercent();
}

function tipTotal_onmousedown(event) {
    if (validateInput() === false) {
        return;
    }

    var checkAmount = parseFloat(document.getElementById("txtCheckAmount").value.trim());
    gTipPercent = parseFloat(document.getElementById("txtTipAmountPercent").value.trim());
    gSalesTaxPercent = parseFloat(document.getElementById("txtSalesTaxPercent").value.trim());
    var salesTaxAmount = checkAmount - checkAmount * (100 / (100 + gSalesTaxPercent));
    var tipAmount = checkAmount * gTipPercent / 100;

    document.getElementById("txtSalesTaxAmount").value = convertNumberToString(salesTaxAmount);
    document.getElementById("txtTipAmount").value = convertNumberToString(tipAmount);
    
    storeSalesTipPercent();
}

function storeSalesTipPercent() {
    localStorage.stp = "" + gSalesTaxPercent + "";
    localStorage.tp = "" + gTipPercent + "";
}

function ditStorageGet(key, dfltValue) {
    var value = localStorage.getItem(key);
    if (value == undefined) {
        return dfltValue;
    }
    return value;
}

function validateInput() {
    // check amount
    if (floatTryParse(document.getElementById("txtCheckAmount").value.trim()) === false) {
        document.getElementById("txtCheckAmount").focus();
        document.getElementById("txtSalesTaxAmount").value = "";
        document.getElementById("txtTipAmount").value = "";
        alert("Enter a positive number for the Check Amount.");
        return false;
    }
    // tip amount percent
    if (floatTryParse(document.getElementById("txtTipAmountPercent").value.trim()) === false) {
        document.getElementById("txtTipAmountPercent").focus();
        document.getElementById("txtSalesTaxAmount").value = "";
        document.getElementById("txtTipAmount").value = "";
        alert("Enter a positive number for the Tip Amount Percentage.");
        return false;
    }
    // sales tax percent
    if (floatTryParse(document.getElementById("txtSalesTaxPercent").value.trim()) === false) {
        document.getElementById("txtSalesTaxPercent").focus();
        document.getElementById("txtSalesTaxAmount").value = "";
        document.getElementById("txtTipAmount").value = "";
        alert("Enter a positive number for the Sales Tax Percent.");
        return false;
    }
    return true;
}

function floatTryParse(numberString) {
    var checkDigits = numberString.split("");
    if (checkDigits.length === 0) {
        //alert('Not a number!');
        return false;
    }
    var checkNumbers = new RegExp('[0-9]');
    var checkDecimal = new RegExp('[.]');
    var totalNumbersAfterDecimal = 0;
    var totalDecimals = 0;
    var totalNumbersBeforeDecimal = 0;
    for (var i = 0; i < checkDigits.length; i++) {
        console.log(checkDigits[i]);
        if (checkNumbers.test(checkDigits[i])) {
            if (totalDecimals === 0) {
                totalNumbersBeforeDecimal += 1;
            } else {
                totalNumbersAfterDecimal += 1;
            }
        }
        else if (checkDecimal.test(checkDigits[i])) {
            totalDecimals += 1;
        }
        else {
            // alert('Not a number!');
            return false;
        }
        if (totalDecimals > 1) {
            // alert('Not a number!');
            return false;
        }
    }
    if (totalDecimals === 1
        && (totalNumbersBeforeDecimal < 1
        || totalNumbersAfterDecimal < 1)) {
        // alert('Not a number!');
        return false;
    }
    //console.log('number!!');
    return true;
}