function calculateValue(){

let year = document.getElementById("year").value;
let kms = document.getElementById("kms").value;
let price = document.getElementById("price").value;
let brand = document.getElementById("brand").value.toLowerCase();

let currentYear = new Date().getFullYear();
let age = currentYear - year;

let factor;

if(age <=1) factor = 0.80;
else if(age==2) factor = 0.70;
else if(age==3) factor = 0.60;
else if(age==4) factor = 0.50;
else if(age==5) factor = 0.40;
else if(age<=7) factor = 0.30;
else factor = 0.20;

let value = price * factor;

// km adjustment
if(kms > 60000) value *= 0.95;
if(kms > 90000) value *= 0.90;
if(kms > 120000) value *= 0.85;

// brand demand
if(brand.includes("maruti")) value *= 1.05;
if(brand.includes("toyota")) value *= 1.05;
if(brand.includes("hyundai")) value *= 1.03;
if(brand.includes("volkswagen")) value *= 0.95;
if(brand.includes("skoda")) value *= 0.95;
if(brand.includes("renault")) value *= 0.93;
if(brand.includes("nissan")) value *= 0.93;

let minPrice = Math.round(value * 0.95);
let maxPrice = Math.round(value * 1.05);

document.getElementById("result").innerHTML =
"Estimated Used Car Price Range: ₹" + minPrice + " – ₹" + maxPrice;

}
