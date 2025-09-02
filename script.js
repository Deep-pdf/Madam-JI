

const area = document.getElementById("card7");
const cursor = document.getElementById("custom-cursor");

// Show Lottie cursor only when inside container
area.addEventListener("mouseenter", () => {
    area.classList.add("hide-cursor");
    cursor.style.display = "block";
});

// Hide it when leaving container
area.addEventListener("mouseleave", () => {
    area.classList.remove("hide-cursor");
    cursor.style.display = "none";
});

// Move cursor only inside the area
area.addEventListener("mousemove", (e) => {
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
});

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
    let message2 = "";
    if (isBirthday) {
        message = `🎉 Happy Birthday!🎂`;
        message2 = `You are ${age} years old today 🎉`;
    } else {
        message2 = `Your age is: ${age}`;
    }

    document.getElementById("input-container").style.display = "none";
    document.getElementById("helloo").style.display = "none";
    document.getElementById("resulttext").innerText = message;
    document.getElementById("resulttext2").innerText = message2;
    document.getElementById("output-container").style.display = "block";
}

const input = document.getElementById("dob");
const button = document.getElementById("but");

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // prevents form submission/reload
        button.click(); // simulate button press
    }
});

function closeoutput() {
    document.getElementById("output-container").style.display = "none"

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

function showcard(num) {
    document.querySelectorAll(".card").forEach(d => d.style.display = 'none');
    document.getElementById("card" + num).style.display = "flex";
}

function restart() {
    showcard(1);
}

// setTimeout(() => {
//     document.getElementById("welcome").style.display = "none";
//     document.getElementById("main-cont").style.display = "block";
// }, 4000);

const main1 = document.getElementById("main1");
const main2 = document.getElementById("main2");
const card7 = document.getElementById("card7");

// Observe class changes on card7
const observer = new MutationObserver(() => {
    if (card7.classList.contains("activee")) {
        // Only start the timeout when card7 is visible
        setTimeout(() => {
            card7.classList.remove("activee");
            main1.classList.add("activee");
            cursor.style.display = "none";
        }, 3000); // you can adjust timing here
    }
});

// Start observing card7 for class changes
observer.observe(card7, { attributes: true, attributeFilter: ["class"] });


// Split the welcome text into characters
const fancyPantsSplit = new SplitType(".welcome", { types: "chars" });

// Create GSAP timeline
const fancyPantsAni = gsap.timeline({
    repeat: 0, // only once
    onComplete: () => {
        // Hide welcome after animation finishes
        document.getElementById("welcome").style.display = "none";
        document.getElementById("main-cont").style.display = "block";
    }
});

// Slide up + fade in
fancyPantsAni.from(fancyPantsSplit.chars, {
    opacity: 0,
    yPercent: 105,
    duration: 1,
    stagger: { each: 0.05, from: "start" },
    ease: "power2.out"
})

    // Hold briefly
    .to(fancyPantsSplit.chars, {
        opacity: 1,
        yPercent: 0,
        duration: 1
    })

    // Slide up + fade out
    .to(fancyPantsSplit.chars, {
        opacity: 0,
        yPercent: -105,
        duration: 1,
        stagger: { each: 0.05, from: "end" },
        ease: "power2.in"
    });


var trendingSlider = new Swiper(".trending-slider", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: 4,
      spaceBetween: 10,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      },

      autoplay: {
        delay: 1500,
        disableOnInteraction: false, // keeps autoplay even after manual swipe
      },

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }
    });   

fetch("music.html")
      .then(res => res.text())
      .then(html => {
        document.getElementById("music").innerHTML = html;
      })
      .catch(err => console.error("Error loading component:", err));
