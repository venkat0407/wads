// Greeting function
function greetUser() {
    let name = document.getElementById("name").value;
    let message = document.getElementById("message");

    if (name === "") {
        message.innerHTML = "Please enter your name!";
        message.style.color = "red";
    } else {
        message.innerHTML = "Hello " + name + "! Thanks for visiting!";
        message.style.color = "green";
    }
}

// Resume download (dummy)
function downloadResume() {
    alert("Resume download feature coming soon!");
}

// Navbar active link highlight
let navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    link.addEventListener("click", function () {
        navLinks.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
    });
});

// Scroll animation
window.addEventListener("scroll", () => {
    let cards = document.querySelectorAll(".project-card");

    cards.forEach(card => {
        let position = card.getBoundingClientRect().top;
        let screenHeight = window.innerHeight;

        if (position < screenHeight - 100) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
});
