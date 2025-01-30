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

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

const pushExercises = [
    "Bench Press",
    "Overhead Press",
    "Dumbbell Flyes",
    "Tricep Dips",
    "Push-Ups",
    "Incline Bench Press",
    "Chest Press Machine",
    "Tricep Pushdowns",
    "Arnold Press",
    "Lateral Raises",
    "Front Raises",
    "Pec Deck Machine"
];

const pullExercises = [
    "Pull-Ups",
    "Deadlifts",
    "Barbell Rows",
    "Bicep Curls",
    "Face Pulls",
    "Lat Pulldowns",
    "Seated Rows",
    "Hammer Curls",
    "Bent Over Rows",
    "T-Bar Rows",
    "Reverse Flyes",
    "Shrugs"
];

const legExercises = [
    "Squats",
    "Lunges",
    "Leg Press",
    "Leg Curls",
    "Calf Raises",
    "Leg Extensions",
    "Romanian Deadlifts",
    "Glute Bridges",
    "Hip Thrusts",
    "Bulgarian Split Squats",
    "Step-Ups",
    "Goblet Squats"
];

const upperExercises = [
    "Bench Press",
    "Pull-Ups",
    "Overhead Press",
    "Barbell Rows",
    "Bicep Curls",
    "Incline Bench Press",
    "Lat Pulldowns",
    "Seated Rows",
    "Tricep Dips",
    "Arnold Press",
    "Lateral Raises",
    "Face Pulls"
];

const lowerExercises = [
    "Squats",
    "Deadlifts",
    "Leg Press",
    "Leg Curls",
    "Calf Raises",
    "Leg Extensions",
    "Romanian Deadlifts",
    "Glute Bridges",
    "Hip Thrusts",
    "Bulgarian Split Squats",
    "Step-Ups",
    "Goblet Squats"
];

function createDays() {
    for (let step = 1; step <= daysInMonth(year, month); step++) { 
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
            if (localStorage.getItem(month+"/"+$(this).data("daynum")) && $(this).data("daynum") <= day) { 
                this.style.backgroundColor = "rgb(10,54,157)";
                console.log("found");
            }
        }
    });
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
function routineGenerationSetup() {
    $("#strengthchoice").on("click", function() {
        localStorage.setItem("goal","strength");
        $(".reprange").text("1-5 reps");
    })
    $("#sizechoice").on("click", function() {
        localStorage.setItem("goal","size");
        $(".reprange").text("8-12 reps");
    })
    $("#endurancechoice").on("click", function() {
        localStorage.setItem("goal","endurance");
        $(".reprange").text("12-20 reps");
    })
    $('#dayInput').on('input', function() {
        let value = parseInt($(this).val());
        let min = parseInt($(this).attr('min'));
        let max = parseInt($(this).attr('max'));
    
        if (value < min) {
          $(this).val(min);
        } else if (value > max) {
          $(this).val(max);
        }
        if ($(this).val() == 3) {
            $(".splitresults").text("Your split will be a Push Pull Legs split, with the following schedule:")
            $(".splitschedule").text("Day 1: Push, Day 2: Rest, Day 3: Pull, Day 4: Rest, Day 5, Legs, Day 6: Rest, Day 7: Rest")
            $(".exercises").html("Push: "+pushExercises.random()+", " + pushExercises.random()+", " + pushExercises.random()+", " + pushExercises.random() 
            + "<br>Pull: "+pullExercises.random()+", " + pullExercises.random()+", " + pullExercises.random()+", " + pullExercises.random() 
            + "<br>Legs: "+legExercises.random()+", " + legExercises.random()+", " + legExercises.random()+", " + legExercises.random());
        }
        if ($(this).val() == 4) {
            $(".splitresults").text("Your split will be a Upper Lower split, with the following schedule:")
            $(".splitschedule").text("Day 1: Upper, Day 2: Lower, Day 3: Rest, Day 4: Upper, Day 5, Lower, Day 6: Rest, Day 7: Rest")
            $(".exercises").html("<br>Upper: "+upperExercises.random()+", " + upperExercises.random()+", " + upperExercises.random()+", " + upperExercises.random()
            + "<br>Lower: "+lowerExercises.random()+", " + lowerExercises.random()+", " + lowerExercises.random()+", " + lowerExercises.random());
        }
        if ($(this).val() == 5) {
            $(".splitresults").text("Your split will be a PPL/UL split, with the following schedule:")
            $(".splitschedule").text("Day 1: Push, Day 2: Pull, Day 3: Legs, Day 4: Rest, Day 5, Upper, Day 6: Lower, Day 7: Rest")
            $(".exercises").html("Push: "+pushExercises.random()+", " + pushExercises.random()+", " + pushExercises.random()+", " + pushExercises.random() 
            + "<br>Pull: "+pullExercises.random()+", " + pullExercises.random()+", " + pullExercises.random()+", " + pullExercises.random() 
            + "<br>Legs: "+legExercises.random()+", " + legExercises.random()+", " + legExercises.random()+", " + legExercises.random()
            + "<br>Upper: "+upperExercises.random()+", " + upperExercises.random()+", " + upperExercises.random()+", " + upperExercises.random()
            + "<br>Lower: "+lowerExercises.random()+", " + lowerExercises.random()+", " + lowerExercises.random()+", " + lowerExercises.random());
        }
        if ($(this).val() == 6) {
            $(".splitresults").text("Your split will be a Push Pull Legs split, with the following schedule:")
            $(".splitschedule").text("Day 1: Push, Day 2: Pull, Day 3: Legs, Day 4: Push, Day 5, Pull, Day 6: Legs, Day 7: Rest")
            $(".exercises").html("Push: "+pushExercises.random()+", " + pushExercises.random()+", " + pushExercises.random()+", " + pushExercises.random() 
            + "<br>Pull: "+pullExercises.random()+", " + pullExercises.random()+", " + pullExercises.random()+", " + pullExercises.random() 
            + "<br>Legs: "+legExercises.random()+", " + legExercises.random()+", " + legExercises.random()+", " + legExercises.random());
        }
      });
}
$(document).ready(function() {
    containerHeight = $('.stepcontainer').height();
    $(window).on('resize', function(){
        containerHeight = $('.stepcontainer').height();
    });
    createDays();
    shiftDays();
    routineGenerationSetup();
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
