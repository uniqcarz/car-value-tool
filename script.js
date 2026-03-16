function calculateValue(){

let year = document.getElementById("year").value;
let kms = document.getElementById("kms").value;
let price = document.getElementById("price").value;

let currentYear = new Date().getFullYear();
let age = currentYear - year;

let depreciation = price * (0.12 * age);

let kmsPenalty = kms * 0.3;

let value = price - depreciation - kmsPenalty;

if(value < price * 0.25){
value = price * 0.25;
}

document.getElementById("result").innerHTML =
"Estimated Used Car Price: ₹" + Math.round(value);

}
