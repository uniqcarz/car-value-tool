let carDatabase = [];

async function loadCarData(){

const response = await fetch("data/car_data.csv");
const data = await response.text();

const rows = data.split("\n").slice(1);

rows.forEach(row => {

const cols = row.split(",");

carDatabase.push({
brand: cols[0].toLowerCase(),
model: cols[1].toLowerCase(),
basePrice: parseInt(cols[4]),
depreciation: parseFloat(cols[5])
if(car.segment.includes("SUV")) value *= 1.08;
});

});

}

loadCarData();

function calculateValue(){

let brand = document.getElementById("brand").value.toLowerCase();
let model = document.getElementById("model").value.toLowerCase();
let year = document.getElementById("year").value;
let km = document.getElementById("kms").value;

let car = carDatabase.find(c =>
c.brand.includes(brand) && c.model.includes(model)
);

if(!car){

document.getElementById("result").innerHTML =
"Car not found in database";

return;

}

let age = new Date().getFullYear() - year;

let value = car.basePrice * Math.pow((1 - car.depreciation), age);

if(car.segment.includes("SUV")) value *= 1.08;

/* km adjustment */

if(km < 20000) value *= 1.05;
else if(km < 40000) value *= 1.02;
else if(km < 70000) value *= 1;
else if(km < 100000) value *= 0.95;
else value *= 0.90;

let minPrice = Math.round(value * 0.95);
let maxPrice = Math.round(value * 1.05);

document.getElementById("result").innerHTML =
"Estimated Used Car Price Range: ₹" + minPrice + " – ₹" + maxPrice;

}
