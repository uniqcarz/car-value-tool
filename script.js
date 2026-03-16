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

  async function loadCarData() {

const response = await fetch("data/car_data.csv");
const data = await response.text();

const rows = data.split("\n").slice(1);

let cars = [];

rows.forEach(row => {

const cols = row.split(",");

cars.push({
brand: cols[0],
model: cols[1],
segment: cols[2],
fuel: cols[3],
basePrice: parseInt(cols[4]),
depreciation: parseFloat(cols[5])
});

});

return cars;

}

  function calculateValue(basePrice, depreciation, year, km){

let age = new Date().getFullYear() - year;

let value = basePrice * Math.pow((1 - depreciation), age);

/* km adjustment */

if(km < 20000) value *= 1.05;
else if(km < 40000) value *= 1.02;
else if(km < 70000) value *= 1;
else if(km < 100000) value *= 0.95;
else value *= 0.90;

return Math.round(value);

}
  
}
