document.addEventListener("click", () => {
    const music = document.getElementById("bg-music");
    music.muted = false;   // unmute after first click
    music.play();
}, { once: true });

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
const trending = document.getElementById("trending");

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // prevents form submission/reload
        button.click(); // simulate button press
    }
});

function closeoutput() {
    document.getElementById("output-container").style.display = "none";
    document.getElementById("trending").style.display = "none";

    const main3 = document.querySelector(".main3");
    main3.style.opacity = "1"; // fade in
    main3.style.zIndex = "2";

    startTimeline(); // trigger the animation

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

function startTimeline() {
    const line = document.getElementById("linee");
    const circles = [document.getElementById("c1"), document.getElementById("c2"), document.getElementById("c3")];
    const photos = [document.getElementById("p1"), document.getElementById("p2"), document.getElementById("p3")];
    const texts = [document.getElementById("textt1"), document.getElementById("textt2"), document.getElementById("textt3")];

    // reset states (important if re-triggered)
    line.style.width = "0";
    circles.forEach(c => c.classList.remove("show"));
    photos.forEach(p => p.classList.remove("show"));
    texts.forEach(t => t.classList.remove("show"));

    // circle positions in %
    const distances = ["0%", "40%", "80%"]; // relative increments for line growth

    // start sequence
    setTimeout(() => {
        circles[0].classList.add("show");
        photos[0].classList.add("show");
        texts[0].classList.add("show");

        // after 1.2s, grow line to circle2
        setTimeout(() => {
            line.style.width = distances[1];
            setTimeout(() => {
                circles[1].classList.add("show");
                photos[1].classList.add("show");
                texts[1].classList.add("show");

                // after 1.2s, grow line to circle3
                setTimeout(() => {
                    line.style.width = distances[2];
                    setTimeout(() => {
                        circles[2].classList.add("show");
                        photos[2].classList.add("show");
                        texts[2].classList.add("show");
                    }, 600);
                }, 1200);
            }, 600);
        }, 1200);
    }, 300);

    setTimeout(() => {
        document.querySelectorAll(".letter img").forEach(img => {
            img.classList.add("animate-in");

            // After slideFadeIn finishes, lock it in place
            img.addEventListener("animationend", () => {
                img.style.opacity = "1";                 // keep visible
                img.style.transform = "translateX(0)";   // stay in final place
                img.classList.remove("animate-in");      // remove so hover won't clash
            }, { once: true });
        });
    }, 10000);


}

const paragraphs = document.querySelectorAll(".paragraph");
const nextBtn = document.getElementById("nextBtn");
let current = 0;

nextBtn.addEventListener("click", () => {
    // current paragraph exit
    paragraphs[current].classList.remove("active1");
    paragraphs[current].classList.add("exit");

    // move to next
    current = (current + 1) % paragraphs.length;
    paragraphs[current].classList.add("active1");

    // reset old one after animation
    setTimeout(() => {
        paragraphs.forEach((p, i) => {
            if (i !== current) {
                p.classList.remove("exit");
            }
        });
    }, 600);
});


const letterbtn = document.getElementById("letter");
const main4 = document.querySelector(".main4");

letterbtn.addEventListener("click", () => {
    main4.style.zIndex = "3";
    document.body.style.overflow = "auto";
});