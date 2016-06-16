var gSalesTaxPercent;
var gTipPercent;
var gIsMenuOpen;

gCalculateTipOnTotal = true;

function body_load() {
    btnCalculateTip.onmousedown = calculateTip_onmousedown;
    btnCloseMenu.onmousedown = closeMenu_onmousedown;
    btnMenu.onmousedown = menu_onmousedown;
    linkTipPreTax.onmousedown = linkTipPreTax_onmousedown;
    linkTipOnTotal.onmousedown = linkTipOnTotal_onmousedown;
    divMain.onmousedown = divMain_onmousedown;

    gSalesTaxPercent = ditStorageGet('stp', 7);
    gTipPercent = ditStorageGet('tp', 15);
    txtSalesTaxPercent.value = convertNumberToString(gSalesTaxPercent);
    txtTipAmountPercent.value = convertNumberToString(gTipPercent);

    gIsMenuOpen = false;

    linkTipPreTax.style.color = "#818181";
    linkTipOnTotal.style.color = "#76DAC4";
}

function divMain_onmousedown() {
    if (gIsMenuOpen === true) {
        closeMenu_onmousedown();
    }
}

function menu_onmousedown() {
    mySidenav.style.width = "250px";
    divMain.style.marginLeft = "250px";
    setTimeout(function () {
        gIsMenuOpen = true;
    }, 100);
}

function closeMenu_onmousedown() {
    mySidenav.style.width = "0";
    divMain.style.marginLeft = "0";
    gIsMenuOpen = false;
}

function linkTipPreTax_onmousedown() {
    if (gCalculateTipOnTotal === true) {
        document.getElementById("linkTipPreTax").style.color = "#76DAC4";
        document.getElementById("linkTipOnTotal").style.color = "#818181";
        gCalculateTipOnTotal = false;
    }
}

function linkTipOnTotal_onmousedown() {
    if (gCalculateTipOnTotal === false) {
        document.getElementById("linkTipPreTax").style.color = "#818181";
        document.getElementById("linkTipOnTotal").style.color = "#76DAC4";
        gCalculateTipOnTotal = true;
    }
}

function convertNumberToString(number) {
    number = Math.round(number * 100) / 100;
    if (number % 1 === 0) {
        return number.toString() + ".00";
    }
    return number.toString();
}


function calculateTip_onmousedown(event) {
    if (gIsMenuOpen === true) {
        return;
    }

    if (validateInput() === false) {
        return;
    }

    var checkAmount = parseFloat(txtCheckAmount.value.trim());
    gTipPercent = parseFloat(txtTipAmountPercent.value.trim());
    gSalesTaxPercent = parseFloat(txtSalesTaxPercent.value.trim());

    if (gCalculateTipOnTotal === false) {
        var salesTaxAmount = checkAmount - checkAmount * (100 / (100 + gSalesTaxPercent));
        var tipAmount = checkAmount * (100 / (100 + gSalesTaxPercent)) * gTipPercent / 100;
    } else {
        var salesTaxAmount = checkAmount - checkAmount * (100 / (100 + gSalesTaxPercent));
        var tipAmount = checkAmount * gTipPercent / 100;
    }

    txtSalesTaxAmount.value = "$" + convertNumberToString(salesTaxAmount);
    txtTipAmount.value = "$" + convertNumberToString(tipAmount);

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
    if (floatTryParse(txtCheckAmount.value.trim()) === false) {
        txtCheckAmount.focus();
        txtSalesTaxAmount.value = "";
        txtTipAmount.value = "";
        alert("Enter a positive number for the Check Amount with at most 2 decimal places.");
        return false;
    }
    // tip amount percent
    if (floatTryParse(document.getElementById("txtTipAmountPercent").value.trim()) === false) {
        document.getElementById("txtTipAmountPercent").focus();
        txtSalesTaxAmount.value = "";
        txtTipAmount.value = "";
        alert("Enter a positive number for the Tip Amount Percentage with at most 2 decimal places.");
        return false;
    }
    // sales tax percent
    if (floatTryParse(txtSalesTaxPercent.value.trim()) === false) {
        txtSalesTaxPercent.focus();
        txtSalesTaxAmount.value = "";
        txtTipAmount.value = "";
        alert("Enter a positive number for the Sales Tax Percent with at most 2 decimal places.");
        return false;
    }
    return true;
}

function floatTryParse(numberString) {
    var checkDigits = numberString.split("");
    if (checkDigits.length === 0) {
        return false;
    }
    var checkNumbers = new RegExp('[0-9]');
    var checkDecimal = new RegExp('[.]');
    var totalNumbersAfterDecimal = 0;
    var totalDecimals = 0;
    var totalNumbersBeforeDecimal = 0;
    for (var i = 0; i < checkDigits.length; i++) {
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
            return false;
        }
        if (totalDecimals > 1) {
            return false;
        }
    }
    if (totalDecimals === 1
        && (totalNumbersBeforeDecimal < 1
        || totalNumbersAfterDecimal < 1)) {
        return false;
    }
    if (totalNumbersAfterDecimal > 2) {
        return false;
    }
    return true;
}