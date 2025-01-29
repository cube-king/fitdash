let gndr = "m";
let unit = "metric";
let bmr = 0;
let weight = 0;
let height = 0;
let age = 0;
$(".gendertoggle").on("click", function () {
    if (gndr == "m") {
        gndr = "f"
        $(this).text("Female");
    }
    else {
        if (gndr == "f") {
            gndr = "m"
            $(this).text("Male");
        }
    }
    calculateBMR()
});
$(".unittoggle").on("click", function () {
    if (unit == "metric") {
        unit = "imperial"
        $(this).text("Imperial");
        $(".weightinput").attr('placeholder', "Weight in lbs");
        $(".heightinput").attr('placeholder', "Height in inches");
    }
    else {
        if (unit == "imperial") {
            unit = "metric"
            $(this).text("Metric");
            $(".weightinput").attr('placeholder', "Weight in kg");
            $(".heightinput").attr('placeholder', "Height in cm");
        }
    }
    calculateBMR()
});

$(".calcinput").each(function(){
    $(this).on("input", function () {  
        age = $(".ageinput").val()
        if (unit == "metric") {
            weight = $(".weightinput").val()
            height = $(".heightinput").val()
        }
        else { 
            if (unit == "imperial") {
                weight = $(".weightinput").val() / 2.205
                height = $(".heightinput").val() * 2.54
            }
        }
        calculateBMR()
    })
})

function calculateBMR() {
    if ($(".weightinput").val() && $(".heightinput").val() && $(".ageinput").val()) {
        if (gndr == "m") {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
        }
        else {
            if (gndr == "f") {
                bmr = 447.593 + (9.247 * $(".weightinput").val()) + (3.098 * $(".heightinput").val()) - (4.330 * $(".ageinput").val())
            }
        }
        $("#sedentarycell").text(Math.round(bmr*1.2)+" calories required");
        $("#liactivecell").text(Math.round(bmr*1.375)+" calories required");
        $("#modactivecell").text(Math.round(bmr*1.55)+" calories required");
        $("#veryactivecell").text(Math.round(bmr*1.725)+" calories required");
        $("#exactivecell").text(Math.round(bmr*1.9)+" calories required");
        console.log(bmr)
        $(".bmrtext").text("BMR: "+Math.round(bmr).toString()+" calories");
    }
} 