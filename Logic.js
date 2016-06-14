function body_load() {
    btnTipPreTax.onmousedown = preTax_onemousedown;
    btnTipOnTotal.onmousedown = tipTotal_onmousedown;
}

function preTax_onemousedown(event) {
    var checkAmount = parseFloat(document.getElementById("txtCheckAmount").value);
    var tipAmountPercent = parseFloat(document.getElementById("txtTipAmountPercent").value);
    var salesTaxPercent = parseFloat(document.getElementById("txtSalesTaxPercent").value);
    var salesTaxAmount = checkAmount - checkAmount * (100 / (100 + salesTaxPercent));
    var tipAmount = checkAmount * (100 / (100 + salesTaxPercent)) * tipAmountPercent / 100;

    salesTaxAmount = Math.round(salesTaxAmount * 100) / 100;
    tipAmount = Math.round(tipAmount * 100) / 100;

    document.getElementById("txtSalesTaxAmount").value = salesTaxAmount.toString();
    document.getElementById("txtTipAmount").value = tipAmount.toString();
}

function tipTotal_onmousedown(event) {
    var checkAmount = parseFloat(document.getElementById("txtCheckAmount").value);
    var tipAmountPercent = parseFloat(document.getElementById("txtTipAmountPercent").value);
    var salesTaxPercent = parseFloat(document.getElementById("txtSalesTaxPercent").value);
    var salesTaxAmount = checkAmount - checkAmount * (100 / (100 + salesTaxPercent));
    var tipAmount = checkAmount * tipAmountPercent / 100;

    salesTaxAmount = Math.round(salesTaxAmount * 100) / 100;
    tipAmount = Math.round(tipAmount * 100) / 100;

    document.getElementById("txtSalesTaxAmount").value = salesTaxAmount.toString();
    document.getElementById("txtTipAmount").value = tipAmount.toString();
}