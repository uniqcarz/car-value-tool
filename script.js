function calculateValue(){

let year = document.getElementById("year").value;
let kms = document.getElementById("kms").value;
let price = document.getElementById("price").value;

let currentYear = new Date().getFullYear();
let age = currentYear - year;

let depreciationFactor;

if(age <= 1) depreciationFactor = 0.80;
else if(age == 2) depreciationFactor = 0.70;
else if(age == 3) depreciationFactor = 0.60;
else if(age == 4) depreciationFactor = 0.50;
else if(age == 5) depreciationFactor = 0.40;
else depreciationFactor = 0.30;

let value = price * depreciationFactor;

// km adjustment
if(kms > 80000){
value = value * 0.90;
}

if(kms > 120000){
value = value * 0.80;
}

document.getElementById("result").innerHTML =
"Estimated Used Car Price: ₹" + Math.round(value);

}
