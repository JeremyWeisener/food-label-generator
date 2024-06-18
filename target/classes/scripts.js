let defaultNutrition = {
    "name": "UNSWEET ORGANIC SOYMILK, UNSWEET",
    "upc": "025293600232",
    "ingredients": "ORGANIC SOYMILK (FILTERED WATER, ORGANIC SOYBEANS), VITAMIN AND MINERAL BLEND (CALCIUM CARBONATE, VITAMIN A PALMITATE, VITAMIN D2, RIBOFLAVIN [B2], VITAMIN B12), SEA SALT, GELLAN GUM, ASCORBIC ACID (TO PROTECT FRESHNESS), NATURAL FLAVOR.",
    "owner": "Danone US, LLC",
    "brand": "SILK",
    "servingSize": 240,
    "servingSizeUnit": "ml",
    "householdServingSize": "1 cup",
    "nutrition": [
        {
            "name": "Protein",
            "value": 2.92,
            "unitName": "G"
        },
        {
            "name": "Total Fat",
            "value": 1.67,
            "unitName": "G"
        },
        {
            "name": "Carbohydrates",
            "value": 1.25,
            "unitName": "G"
        },
        {
            "name": "Calories",
            "value": 33,
            "unitName": "KCAL"
        },
        {
            "name": "Sugars",
            "value": 0.42,
            "unitName": "G"
        },
        {
            "name": "Dietary Fiber",
            "value": 0.8,
            "unitName": "G"
        },
        {
            "name": "Calcium",
            "value": 125,
            "unitName": "MG"
        },
        {
            "name": "Iron",
            "value": 0.42,
            "unitName": "MG"
        },
        {
            "name": "Magnesium",
            "value": 17,
            "unitName": "MG"
        },
        {
            "name": "Phosphorus",
            "value": 33,
            "unitName": "MG"
        },
        {
            "name": "Potassium",
            "value": 146,
            "unitName": "MG"
        },
        {
            "name": "Sodium",
            "value": 31,
            "unitName": "MG"
        },
        {
            "name": "Vitamin A",
            "value": 2500,
            "unitName": "IU"
        },
        {
            "name": "Vitamin D",
            "value": 50,
            "unitName": "IU"
        },
        {
            "name": "Riboflavin",
            "value": 0.167,
            "unitName": "MG"
        },
        {
            "name": "Folate",
            "value": 12,
            "unitName": "UG"
        },
        {
            "name": "Vitamin B-12",
            "value": 1.25,
            "unitName": "UG"
        },
        {
            "name": "Cholesterol",
            "value": 0,
            "unitName": "MG"
        },
        {
            "name": "Trans Fat",
            "value": 0,
            "unitName": "G"
        },
        {
            "name": "Saturated Fat",
            "value": 0.21,
            "unitName": "G"
        },
        {
            "name": "Monounsaturated Fat",
            "value": 0.42,
            "unitName": "G"
        },
        {
            "name": "Polyunsaturated Fat",
            "value": 1.04,
            "unitName": "G"
        }
    ]
}

	let $ = (query) => { return document.querySelector(query); }

	function* group(arr, n) {
	  for (let i = 0; i < arr.length; i += n) {
		yield arr.slice(i, i + n);
	  }
	}

	let makeMacroNutrientRow = (name, value, unitName, indented, dailyRecommendedValue, ratio) => {
		let className = `macro-row ${indented?"indented":""}`;
		let percentage = dailyRecommendedValue ? Math.round(((value/dailyRecommendedValue)*100)*ratio)+"%" : "";
		let calculatedValue = Math.round(value*ratio);
		
		return(`
			<span class=${"\""+className+"\""}>
				<p><b>${name}</b> ${calculatedValue}${unitName.toLowerCase()}</p>
				<p><b>${percentage}</b></p>
			</span>
		`);
	}
	
	let makeMicroNutrientRow = (row) => {
		// name, value, unitName, ratio
		console.log("row", row);
		
		let rowOne = row[0] ? (`
		<span>
			<p>${row[0].name}</p>
			<p>${row[0].value}${row[0].unitName.toLowerCase()}</p>
		</span>`) : ""
		
		let rowTwo = row[1] ? (`
		<span>
			<p>${row[1].name}</p>
			<p>${row[1].value}${row[1].unitName.toLowerCase()}</p>
		</span>`) : ""
		
		return(`
			<div>
				${rowOne}
				${rowTwo}
			</div>
		`);
	}

	let submitForm = () => {
		let upc = document.querySelector('input[name="upc"]').value
		console.log("upc", upc);
		let data = fetch('/submit', {
		method: 'POST', // Specify POST method
		headers: {
			'Content-Type': 'application/json'
		},
			body: JSON.stringify({ upc: upc })
		})
		.then((response) => response.json())
		.then((data) => {
			populateLabel(data);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}
	
	let populateLabel = (data) => {
		if(data == null){data = defaultNutrition}
		
		let nutritionRatio = data.servingSize/100
		
		let calories = data.nutrition.find(e => e.name=="Calories");
		let totalFats = data.nutrition.find(e => e.name=="Total Fat")
		let saturatedFats = data.nutrition.find(e => e.name=="Saturated Fat")
		let transFats = data.nutrition.find(e => e.name=="Trans Fat")
		let polyunsaturated= data.nutrition.find(e => e.name=="Polyunsaturated Fat")
		let monounsaturated = data.nutrition.find(e => e.name=="Monounsaturated Fat")
		let cholesterol = data.nutrition.find(e => e.name=="Cholesterol")
		let sodium = data.nutrition.find(e => e.name=="Sodium")
		let carbs = data.nutrition.find(e => e.name=="Carbohydrates")
		let fiber = data.nutrition.find(e => e.name=="Dietary Fiber")
		let sugars= data.nutrition.find(e => e.name=="Sugasr")
		let protein= data.nutrition.find(e => e.name=="Protein")
		
		let macroNutrientList = ["Calories", "Total Fat", "Saturated Fat", "Trans Fat", "Polyunsaturated Fat", "Monounsaturated Fat", "Cholesterol", "Sodium", "Carbohydrates", "Dietary Fiber", "Sugars", "Protein"];
		
		let microNutrients = data.nutrition.filter(e => !macroNutrientList.includes(e.name));
		
		let fatRows = [
			totalFats ? makeMacroNutrientRow(totalFats.name, totalFats.value, totalFats.unitName, false, 65, nutritionRatio) : "",
			saturatedFats ? makeMacroNutrientRow(saturatedFats.name, saturatedFats.value, saturatedFats.unitName, true, 20, nutritionRatio) : "",
			transFats ? makeMacroNutrientRow(transFats.name, transFats.value, transFats.unitName, true, null, nutritionRatio) : "",
			polyunsaturated? makeMacroNutrientRow(polyunsaturated.name, polyunsaturated.value, polyunsaturated.unitName, true, null, nutritionRatio) : "",
			monounsaturated ? makeMacroNutrientRow(monounsaturated.name, monounsaturated.value, monounsaturated.unitName, true, null, nutritionRatio) : ""
		];
		
		let carbRows = [
			carbs ? makeMacroNutrientRow(carbs.name, carbs.value, carbs.unitName, false, 300, nutritionRatio) : "",
			fiber ? makeMacroNutrientRow(fiber.name, fiber.value, fiber.unitName, true, 25, nutritionRatio) : "",
			sugars ? makeMacroNutrientRow(sugars.name, sugars.value, sugars.unitName, true, null, nutritionRatio) : "",
		];
		
		let microNutrientRows = [...group(microNutrients, 2)].map(row => makeMicroNutrientRow(row));
		
		$("#serving-size").innerHTML = 			`Serving Size ${data.householdServingSize} (${data.servingSize}${data.servingSizeUnit})`;
		$("#serving-per-container").innerHTML = `Servings Per Container _______`;
		$("#calories-value").innerHTML = 		`<b>Calories</b>`;
		$("#calories-from-fat").innerHTML = 	`<b>${Math.round(calories.value*nutritionRatio)}</b>`;
		$("#fat").innerHTML = 					fatRows.join("");
		$("#cholesterol").innerHTML = 			makeMacroNutrientRow(cholesterol.name, cholesterol.value, cholesterol.unitName, false, 300, nutritionRatio);
		$("#sodium").innerHTML = 				makeMacroNutrientRow(sodium.name, sodium.value, sodium.unitName, false, 2400, nutritionRatio);
		$("#carbs").innerHTML = 				carbRows.join("");
		$("#protein").innerHTML = 				makeMacroNutrientRow(protein.name, protein.value, protein.unitName, false, null, nutritionRatio);
		$("#micro-nutrients").innerHTML = 		microNutrientRows.join("");
	}
	
	populateLabel();