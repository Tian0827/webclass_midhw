function calculateBMI() {
    // 表單的 value 是文字，用 Number() 轉成數字。BMI 公式使用公尺。
    let height = Number(document.getElementById("bmi-height").value) / 100;
    let weight = Number(document.getElementById("bmi-weight").value);
    let bmi = weight / (height * height);
    let category;

    // 先用原始數值分類，最後才用 toFixed(2) 顯示小數點後兩位。
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

// 記住目前選擇的食物，供下方的份量換算使用。
let selectedFoodName = "";
let caloriesPer100g = 0;

function showNutrition(selectedCategory) {
    let categories = ["protein", "carbs", "fat", "fiber"];

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let panel = document.getElementById("nutrition-" + category);
        let button = document.getElementById("button-" + category);
        let isSelected = category === selectedCategory;

        panel.hidden = !isSelected;
        // setAttribute 更新按鈕的「已按下」狀態，供畫面與輔助工具讀取。
        button.setAttribute("aria-pressed", isSelected);
    }

    document.getElementById("nutrition-details").hidden = false;
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
    document.getElementById("selected-food").innerHTML = "請先點選表格中的食物名稱。";
    document.getElementById("calorie-result").innerHTML = "這份食物的熱量會顯示在這裡。";
}

function selectFood(foodId) {
    selectedFoodName = document.getElementById(foodId + "-name").textContent;
    caloriesPer100g = Number(document.getElementById(foodId + "-calories").textContent);

    document.getElementById("selected-food").textContent =
        "已選擇" + selectedFoodName + "，每 100 公克 " + caloriesPer100g + " 大卡。";
    document.getElementById("calorie-result").innerHTML = "這份食物的熱量會顯示在這裡。";
}

function calculateCalories() {
    let grams = Number(document.getElementById("food-weight").value);
    let result = document.getElementById("calorie-result");

    if (selectedFoodName === "") {
        result.innerHTML = "請先點選表格中的食物名稱。";
    } else {
        let calories = grams / 100 * caloriesPer100g;
        result.textContent = grams + " 公克的" + selectedFoodName + "約有 " + calories.toFixed(1) + " 大卡。";
    }
}

function showTrainingPlan(days) {
    let showThreeDays = days === 3;

    // hidden 為 true 時會隱藏表格。兩個表格使用相反的狀態。
    document.getElementById("plan-three").hidden = !showThreeDays;
    document.getElementById("plan-four").hidden = showThreeDays;
    document.getElementById("plan-button-three").setAttribute("aria-pressed", showThreeDays);
    document.getElementById("plan-button-four").setAttribute("aria-pressed", !showThreeDays);
}
