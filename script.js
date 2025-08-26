function calculate() {
    const dobInput = document.getElementById("dob");
    const dobinput = dobInput.value;

    if (!dobinput) {
        dobInput.classList.add("shake");
        setTimeout(() => dobInput.classList.remove("shake"), 500);
        return;
    }

    const dob = new Date(dobinput);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();

    const birthdayPassed = today.getMonth() > dob.getMonth() ||
        (today.getMonth() == dob.getMonth() && today.getDate() >= dob.getDate());

    if (!birthdayPassed) {
        age--;
    }

    const isBirthday = (today.getMonth() == dob.getMonth() && today.getDate() == dob.getDate());

    let message = "";
    if (isBirthday) {
        message = `🎉 Happy Birthday! 🎂 You are ${age} years old today 🎉`;
    } else {
        message = `Your age is: ${age}`;
    }

    document.getElementById("input-container").style.display = "none";
    document.getElementById("resulttext").innerText = message;
    document.getElementById("output-container").style.display = "block";
}

function closeoutput() {
    document.getElementById("output-container").style.display = "none";
}

const glow = document.querySelector(".glow");

let pos = -200;
let speed = 0.7;

function animateGlow() {
    pos += speed;
    if (pos > 200) pos = -200;
    glow.style.transform = `translate(${pos}%, ${pos}%) rotate(45deg)`;
    requestAnimationFrame(animateGlow);
}

animateGlow();

showcard(1);

function showcard(num){
    document.querySelectorAll(".card").forEach(d => d.style.display='none');
    document.getElementById("card" + num).style.display="flex";
}

function restart(){
    showcard(1);
}

// window.onload = () => showcard(1);