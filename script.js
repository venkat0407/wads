// Navbar scroll color
window.addEventListener("scroll", () => {
    document.querySelector(".navbar")
        .classList.toggle("scrolled", window.scrollY > 50);
});

// Cursor
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    follower.style.left = (e.clientX - 10) + "px";
    follower.style.top = (e.clientY - 10) + "px";
});

// Click ripple
document.addEventListener("click", e => {
    let ripple = document.createElement("div");
    ripple.classList.add("ripple");

    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";

    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
});

// Section highlight
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    let scroll = window.scrollY + 200;

    sections.forEach(sec => {
        if (scroll > sec.offsetTop && scroll < sec.offsetTop + sec.offsetHeight) {
            sec.classList.add("active-section");
        } else {
            sec.classList.remove("active-section");
        }
    });
});

// Button/card click color
document.querySelectorAll(".btn, .card").forEach(el => {
    el.addEventListener("click", function () {
        this.style.background = "green";
        this.style.color = "white";

        setTimeout(() => {
            this.style.background = "";
            this.style.color = "";
        }, 400);
    });
});

// Contact
function greetUser() {
    let name = document.getElementById("name").value;
    let msg = document.getElementById("message");

    msg.innerHTML = name ? "Hello " + name + "!" : "Enter your name!";
}

// Resume
function downloadResume() {
    alert("Resume feature coming soon!");
}
