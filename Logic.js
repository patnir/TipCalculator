function body_load() {
    btnTipPreTax.onmousedown = preTax_onemousedown;
    btnTipOnTotal.onmousedown = tipTotal_onmousedown;
}

function preTax_onemousedown(event) {
    if (validateInput() === false) {
        return;
    }

    var checkAmount = parseFloat(document.getElementById("txtCheckAmount").value.trim());
    var tipAmountPercent = parseFloat(document.getElementById("txtTipAmountPercent").value.trim());
    var salesTaxPercent = parseFloat(document.getElementById("txtSalesTaxPercent").value.trim());
    var salesTaxAmount = checkAmount - checkAmount * (100 / (100 + salesTaxPercent));
    var tipAmount = checkAmount * (100 / (100 + salesTaxPercent)) * tipAmountPercent / 100;

    salesTaxAmount = Math.round(salesTaxAmount * 100) / 100;
    tipAmount = Math.round(tipAmount * 100) / 100;

    document.getElementById("txtSalesTaxAmount").value = salesTaxAmount.toString();
    document.getElementById("txtTipAmount").value = tipAmount.toString();
}

function tipTotal_onmousedown(event) {
    if (validateInput() === false) {
        return;
    }

    var checkAmount = parseFloat(document.getElementById("txtCheckAmount").value.trim());
    var tipAmountPercent = parseFloat(document.getElementById("txtTipAmountPercent").value.trim());
    var salesTaxPercent = parseFloat(document.getElementById("txtSalesTaxPercent").value.trim());

    var salesTaxAmount = checkAmount - checkAmount * (100 / (100 + salesTaxPercent));
    var tipAmount = checkAmount * tipAmountPercent / 100;

    salesTaxAmount = Math.round(salesTaxAmount * 100) / 100;
    tipAmount = Math.round(tipAmount * 100) / 100;

    document.getElementById("txtSalesTaxAmount").value = salesTaxAmount.toString();
    document.getElementById("txtTipAmount").value = tipAmount.toString();
}

function validateInput() {
    // check amount
    if (floatTryParse(document.getElementById("txtCheckAmount").value.trim()) === false) {
        alert("Enter a number for the Check Amount.");
        return false;
    }
    // tip amount percent
    if (floatTryParse(document.getElementById("txtTipAmountPercent").value.trim()) === false) {
        alert("Enter a number for the Tip Amount Percentage.");
        return false;
    }
    // sales tax percent
    if (floatTryParse(document.getElementById("txtSalesTaxPercent").value.trim()) === false) {
        alert("Enter a number for the Sales Tax Percent.");
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