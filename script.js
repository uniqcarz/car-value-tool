let carDatabase = [];

/* LOAD CSV DATA */

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


/* POPULATE MODEL DROPDOWN */

function populateModels(){

let brand = document.getElementById("brand").value.toLowerCase();
let modelDropdown = document.getElementById("model");

modelDropdown.innerHTML = "<option value=''>Select Model</option>";

let models = carDatabase.filter(car =>
car.brand.includes(brand)
);

/* remove duplicates */

let uniqueModels = [...new Set(models.map(car => car.model))];

uniqueModels.forEach(model => {

let option = document.createElement("option");

option.value = model;
option.text = model;

modelDropdown.appendChild(option);

});

}


/* DEPRECIATION CURVE */

function calculateDepreciatedValue(basePrice, age){

let value = basePrice;

for(let i=1;i<=age;i++){

if(i==1) value *= 0.85;
else if(i==2) value *= 0.88;
else if(i==3) value *= 0.90;
else if(i==4) value *= 0.92;
else if(i==5) value *= 0.94;
else value *= 0.95;

}

return value;

}


/* MAIN CALCULATOR */

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

let value = calculateDepreciatedValue(car.basePrice, age);


/* BRAND RESALE ADJUSTMENT */

let brandFactor = 1;

if(car.brand.includes("maruti")) brandFactor = 1.07;
else if(car.brand.includes("toyota")) brandFactor = 1.07;
else if(car.brand.includes("hyundai")) brandFactor = 1.05;
else if(car.brand.includes("honda")) brandFactor = 1.03;
else if(car.brand.includes("tata")) brandFactor = 1.02;
else if(car.brand.includes("mahindra")) brandFactor = 1.02;
else if(car.brand.includes("volkswagen")) brandFactor = 0.96;
else if(car.brand.includes("skoda")) brandFactor = 0.95;
else if(car.brand.includes("renault")) brandFactor = 0.94;
else if(car.brand.includes("nissan")) brandFactor = 0.93;

value *= brandFactor;


/* SUV DEMAND ADJUSTMENT */

if(car.segment.includes("suv"))
value *= 1.08;


/* KM ADJUSTMENT */

if(km < 20000) value *= 1.05;
else if(km < 40000) value *= 1.02;
else if(km < 70000) value *= 1;
else if(km < 100000) value *= 0.95;
else value *= 0.90;


/* FINAL PRICE RANGE */

let minPrice = Math.round(value * 0.95);
let maxPrice = Math.round(value * 1.05);

document.getElementById("result").innerHTML =
"Estimated Used Car Price Range: ₹" + minPrice + " – ₹" + maxPrice;

}
