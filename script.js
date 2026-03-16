let carDatabase = [];

async function loadCarData(){

const response = await fetch("data/car_data.csv");
const text = await response.text();

const rows = text.split("\n");

rows.forEach(row => {

if(!row.trim()) return;

const cols = row.split(",");

if(cols.length < 6) return;

carDatabase.push({
brand: cols[0].trim().toLowerCase(),
model: cols[1].trim().toLowerCase(),
segment: cols[2].trim().toLowerCase(),
basePrice: parseInt(cols[4]),
depreciation: parseFloat(cols[5])
});

});

console.log("Cars loaded:", carDatabase.length);

}

window.onload = loadCarData;

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

/* SUV demand adjustment */

let segment = car.segment.toLowerCase();

if(
segment.includes("suv") ||
segment.includes("utility")
){
value = value * 1.08;
}

/* KM adjustment */

if(km < 20000) value = value * 1.05;
else if(km < 40000) value = value * 1.02;
else if(km < 70000) value = value * 1;
else if(km < 100000) value = value * 0.95;
else value = value * 0.90;

/* price range */

let minPrice = Math.round(value * 0.95);
let maxPrice = Math.round(value * 1.05);

document.getElementById("result").innerHTML =
"Estimated Used Car Price Range: ₹" + minPrice + " – ₹" + maxPrice;

}
