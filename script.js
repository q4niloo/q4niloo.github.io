const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const popup = document.getElementById("popup");

let spacer = null;

function moveNoButton(e) {
    if (e && e.cancelable) e.preventDefault();

    // First time: keep a placeholder so the Yes button doesn't jump around
    if (!spacer) {
        const rect = noButton.getBoundingClientRect();
        spacer = document.createElement("span");
        spacer.style.display = "inline-block";
        spacer.style.width = rect.width + "px";
        spacer.style.height = rect.height + "px";
        noButton.parentNode.insertBefore(spacer, noButton);
        noButton.classList.add("is-fleeing");
    }

    // Keep the button fully inside the visible screen (works on small phones)
    const pad = 12;
    const maxX = Math.max(window.innerWidth - noButton.offsetWidth - pad * 2, 0);
    const maxY = Math.max(window.innerHeight - noButton.offsetHeight - pad * 2, 0);
    noButton.style.left = pad + Math.random() * maxX + "px";
    noButton.style.top = pad + Math.random() * maxY + "px";
}

// pointerenter = mouse hover, pointerdown = finger touch
noButton.addEventListener("pointerenter", moveNoButton);
noButton.addEventListener("pointerdown", moveNoButton);
noButton.addEventListener("touchstart", moveNoButton, { passive: false });
noButton.addEventListener("click", (e) => e.preventDefault());

yesButton.addEventListener("click", () => {
    popup.style.display = "block";
    popup.classList.add("fade-in");
});

popup.addEventListener("click", () => {
    popup.style.display = "none";
    popup.classList.remove("fade-in");
});

// Hide the popup initially
popup.style.display = "none";

// Block pinch-zoom (iOS Safari ignores user-scalable=no)
["gesturestart", "gesturechange", "gestureend"].forEach((t) =>
    document.addEventListener(t, (e) => e.preventDefault())
);
document.addEventListener("touchmove", (e) => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
