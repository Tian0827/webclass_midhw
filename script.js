function calculateBMI() {
    
    let height = Number(document.getElementById("bmi-height").value) / 100;
    let weight = Number(document.getElementById("bmi-weight").value);
    let bmi = weight / (height * height);
    let category;

    
    if (bmi < 18.5) {
        category = "過輕";
    } else if (bmi < 24) {
        category = "正常";
    } else if (bmi < 27) {
        category = "過重";
    } else {
        category = "肥胖";
    }

    document.getElementById("bmi-result").innerHTML = "BMI " + bmi.toFixed(2) + "，體位分類為" + category + "。";
}

function calculateBMR() {
    let height = Number(document.getElementById("bmr-height").value);
    let weight = Number(document.getElementById("bmr-weight").value);
    let age = Number(document.getElementById("bmr-age").value);
    let sex = document.getElementById("bmr-sex").value;
    let bmr = 10 * weight + 6.25 * height - 5 * age;

    if (sex === "male") {
        bmr = bmr + 5;
    } else {
        bmr = bmr - 161;
    }

    let result = document.getElementById("bmr-result");
    if (bmr <= 0) {
        result.innerHTML = "請確認身高、體重與年齡是否填寫正確。";
    } else {
        result.innerHTML = "每日靜息耗能約 " + bmr.toFixed(0) + " 大卡。";
    }
}


let selectedFoodName = "";
let selectedNutrientName = "";
let caloriesPer100g = 0;
let nutrientPer100g = 0;

function showNutrition(selectedCategory) {
    let categories = ["protein", "carbs", "fat", "fiber"];

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let panel = document.getElementById("nutrition-" + category);
        let button = document.getElementById("button-" + category);
        let isSelected = category === selectedCategory;

        panel.hidden = !isSelected;
        
        button.setAttribute("aria-pressed", isSelected);
    }

    document.getElementById("nutrition-details").hidden = false;
    selectedNutrientName = document.getElementById("nutrient-label-" + selectedCategory).textContent;
    resetFoodSelection();
}

function showCarbTable(type) {
    let showFastCarbs = type === "fast";

    document.getElementById("table-fast-carbs").hidden = !showFastCarbs;
    document.getElementById("table-slow-carbs").hidden = showFastCarbs;
    document.getElementById("carb-button-fast").setAttribute("aria-pressed", showFastCarbs);
    document.getElementById("carb-button-slow").setAttribute("aria-pressed", !showFastCarbs);
    resetFoodSelection();
}

function resetFoodSelection() {
    selectedFoodName = "";
    caloriesPer100g = 0;
    nutrientPer100g = 0;
    document.getElementById("selected-food").innerHTML = "請先點選表格中的食物名稱。";
    document.getElementById("calorie-result").innerHTML = "這份食物的熱量與營養含量會顯示在這裡。";
}

function selectFood(foodId) {
    selectedFoodName = document.getElementById(foodId + "-name").textContent;
    caloriesPer100g = Number(document.getElementById(foodId + "-calories").textContent);
    nutrientPer100g = Number(document.getElementById(foodId + "-nutrient").textContent);

    document.getElementById("selected-food").textContent =
        "已選擇" + selectedFoodName + "，每 100 公克 " + caloriesPer100g + " 大卡。";
    document.getElementById("calorie-result").innerHTML = "這份食物的熱量與營養含量會顯示在這裡。";
}

function calculateCalories() {
    let grams = Number(document.getElementById("food-weight").value);
    let result = document.getElementById("calorie-result");

    if (selectedFoodName === "") {
        result.innerHTML = "請先點選表格中的食物名稱。";
    } else {
        let portion = grams / 100;
        let calories = portion * caloriesPer100g;
        let nutrientGrams = portion * nutrientPer100g;
        result.textContent = grams + " 公克的" + selectedFoodName + "約有 " + calories.toFixed(1) + " 大卡，"
            + selectedNutrientName + "約 " + nutrientGrams.toFixed(1) + " 公克。";
    }
}

function showTrainingPlan(days) {
    let showThreeDays = days === 3;

    
    document.getElementById("plan-three").hidden = !showThreeDays;
    document.getElementById("plan-four").hidden = showThreeDays;
    document.getElementById("plan-button-three").setAttribute("aria-pressed", showThreeDays);
    document.getElementById("plan-button-four").setAttribute("aria-pressed", !showThreeDays);
}
