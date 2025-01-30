let i = 0;
let date = new Date();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let day = date.getDate();
const daysInMonth = (year, month) => new Date(year,month,0).getDate()
let gndr = localStorage.getItem("gender") || "m"; 
let unit = localStorage.getItem("unit") || "metric"; 
let bmr = 0;
let weight = 0;
let height = 0;
let age = 0;
let vh = $(window).height() / 100;
let containerHeight;

function createDays() {
    for (let step = 1; step < daysInMonth(year,month); step++) {
        $('.graphcontainer').append(
            '<div class="dayredborder day" data-monthnum="'+month+'" data-daynum="'+step+'"></div>'
        );
    }
}
function shiftDays() {
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    for (let days = 0; days < 6 - firstDay; days++) {
        $('.graphcontainer').prepend(
            '<div class="dayspacer"></div>'
        );
    }    
}
function updateCompletedDays() {
    $(".day").each(function() {
        if ($(this).data("monthnum") == month) {
            if (localStorage.getItem(month+"/"+$(this).data("daynum"))) {
                this.style.backgroundColor = "rgb(0, 117, 25)"
                console.log("found")
            }
        }
    })
}
$(".gendertoggle").on("click", function () {
    if (gndr === "m") {
        gndr = "f";
        $(this).text("Female");
    } else {
        gndr = "m";
        $(this).text("Male");
    }
    localStorage.setItem("gender", gndr);
    console.log("Gender updated:", localStorage.getItem("gender"));
    calculateBMR();
});
$(".unittoggle").on("click", function () {
    if (unit == "metric") {
        unit = "imperial"
        $(this).text("Imperial");
        $(".weightinput").attr('placeholder', "Weight in lbs");
        $(".heightinput").attr('placeholder', "Height in inches");
        localStorage.setItem("unit","imperial")
    }
    else {
        if (unit == "imperial") {
            unit = "metric"
            $(this).text("Metric");
            $(".weightinput").attr('placeholder', "Weight in kg");
            $(".heightinput").attr('placeholder', "Height in cm");
            localStorage.setItem("unit","metric")
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
        if ($(".weightinput").val()) {
            localStorage.setItem("weight",$(".weightinput").val())
        }
        if ($(".heightinput").val()) {
            localStorage.setItem("height",$(".heightinput").val())
        }
        if ($(".ageinput").val()) {
            localStorage.setItem("age",$(".ageinput").val())
        }
        calculateBMR()
        console.log(localStorage.getItem("weight"))
        console.log(localStorage.getItem("height"))
        console.log(localStorage.getItem("age"))
    })
})
function loadSavedVals() {
    if (localStorage.getItem("gender")) {
        gndr = localStorage.getItem("gender");
    }
    else {
        gndr = 0;
    }
    if (localStorage.getItem("unit")) {
        unit = localStorage.getItem("unit")
        if (unit == "metric") {
            $(".unittoggle").text("Metric");
            $(".weightinput").attr('placeholder', "Weight in kg");
            $(".heightinput").attr('placeholder', "Height in cm");
        }
        else {
            if (unit == "imperial") {
                $(".unittoggle").text("Imperial");
                $(".weightinput").attr('placeholder', "Weight in lbs");
                $(".heightinput").attr('placeholder', "Height in inches");
            }
        }
    }
    else {
        localStorage.setItem("unit","metric")
    }
    
    if (localStorage.getItem("weight")) {
        $(".weightinput").val(localStorage.getItem("weight"));
        weight = localStorage.getItem("weight");
    }
    if (localStorage.getItem("height")) {
        $(".heightinput").val(localStorage.getItem("height"));
        height = localStorage.getItem("height");
    }
    if (localStorage.getItem("age")) {
        $(".ageinput").val(localStorage.getItem("age"));
        age = localStorage.getItem("age");
    }
    if (gndr == "m") {
        $(".gendertoggle").text("Male");
    }
    else {
        if (gndr == "f") {
            $(".gendertoggle").text("Female");
        }
    } 
    if (!localStorage.getItem("gender")) {
        localStorage.setItem("gender", "m");
    }
    gndr = localStorage.getItem("gender");
}
function calculateBMR() {
    weight = parseFloat($(".weightinput").val()) || 0;
    height = parseFloat($(".heightinput").val()) || 0;
    age = parseInt($(".ageinput").val()) || 0;
    if (unit === "imperial") {
        weight = $(".weightinput").val() / 2.205;
        height = $(".heightinput").val() * 2.54; 
    } else {
        weight = $(".weightinput").val();
        height = $(".heightinput").val();  
    }
    if (weight > 0 && height > 0 && age > 0) {
        bmr = gndr === "m"
            ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
            : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        $("#sedentarycell").text(Math.round(bmr * 1.2) + " calories required");
        $("#liactivecell").text(Math.round(bmr * 1.375) + " calories required");
        $("#modactivecell").text(Math.round(bmr * 1.55) + " calories required");
        $("#veryactivecell").text(Math.round(bmr * 1.725) + " calories required");
        $("#exactivecell").text(Math.round(bmr * 1.9) + " calories required");
        $(".bmrtext").text("BMR: " + Math.round(bmr).toString() + " calories");
    } else {
        $(".bmrtext").text("BMR: 0 calories");
    }
}
$(document).ready(function() {
    containerHeight = $('.stepcontainer').height();
    createDays();
    shiftDays();
    loadSavedVals();
    calculateBMR();
    localStorage.setItem(month+"/"+day,1);
    console.log(month+"/"+day);
    updateCompletedDays();
    console.log(localStorage.getItem("unit"));
    $(".routinemaker").addClass('routinemaker-transition');
});

let scrollindex = 0;

function scrollRoutineUp() { 
    scrollindex++;
    $(".routinemaker").css('transform', 'translateY(-' + (containerHeight * scrollindex) + 'px)');
    console.log(scrollindex);
}

function scrollRoutineDown() { 
    if (scrollindex > 0) {
        scrollindex--;
        $(".routinemaker").css('transform', 'translateY(-' + (containerHeight * scrollindex) + 'px)');
        console.log(scrollindex);
    }
}

$(".nextbutton").each(function(){
    $(this).on("click", function(){
        scrollRoutineUp();
    });
});

$(".backbutton").each(function(){
    $(this).on("click", function(){
        scrollRoutineDown();
    });
});
