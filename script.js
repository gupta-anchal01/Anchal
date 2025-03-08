"use strict";

const { PI: π, E: e, sin, cos, pow, abs } = Math;
let c, ctx, W, H;

let fc = 0;
let θ = 0;
let scf = 70; // Scale factor for butterfly
let x = 0, y = 0, tempx = 0, tempy = 0;

const setup = () => {
    c = document.getElementById("Canvas");
    ctx = c.getContext("2d");
    [W, H] = setSize(c, ctx);
    window.onresize = () => {
        [W, H] = setSize(c, ctx);
        fc = 0;
    };
    window.requestAnimationFrame(animate);
};

const animate = () => {
    ctx.fillStyle = `rgb(
        ${abs(sin(fc / 360)) * 255},
        ${abs(sin(fc / 360 + π / 6)) * 255},
        ${abs(sin(fc / 360 - π / 6)) * 255}
    )`;

    ctx.save();
    ctx.translate(W / 2, H / 2);
    tempx = x;
    tempy = y;
    let r = pow(e, sin(θ)) - 2 * cos(4 * θ) + pow(sin((2 * θ - π) / 24), 5);
    r *= scf;
    x = r * cos(θ);
    y = -r * sin(θ);
    drawLine(ctx, x, y, tempx, tempy);
    ctx.restore();

    θ = fc / 60;
    fc++;
    window.requestAnimationFrame(animate);
};

const drawLine = (ctx, x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
};

const setSize = (c, ctx, w = window.innerWidth, h = window.innerHeight, pd = devicePixelRatio) => {
    c.style.width = `${w}px`;
    c.style.height = `${h}px`;
    c.width = w * pd;
    c.height = h * pd;
    ctx.scale(pd, pd);
    return [w, h];
};

window.onload = setup;

// Background Music with User Interaction
let music = new Audio("music.mp3");
music.loop = true;

document.addEventListener("click", () => {
    if (music.paused) {
        music.play();
    }
}, { once: true });

// Compliments and Image Logic
let compliments = [
    "💕 Your elegance and grace are truly captivating. ✨💕",
    "😍 Your presence brings warmth and positivity 😍",
    "💖 You make the world a better place. 😌💖",
    "🌟 Even if the sky is falling down, you shine! 🌟",
    "💘 Keep Smiling! 💘",
    "🌷 No need to worry, just be happy! 🌷",
    "🎵 Your beauty is truly mesmerizing! 🎵",
    "💞 You are the most beautiful soul 💞",
    "💎 Always be happy and shine bright! 💎",
    "😍 Your kindness is your true beauty! 😍"
];

let complimentIndex = 0;
let anchalImages = [
    "photo1.png", "photo2.png", "photo3.png", "photo4.png",
    "photo5.png", "photo6.png", "photo7.png", "photo8.png", "photo9.png"
];

function showImages() {
    let crushName = document.getElementById("crushName").value.trim().toLowerCase();
    let inputBox = document.getElementById("inputBox");
    let imageBox = document.getElementById("imageBox");
    let complimentBox = document.getElementById("complimentBox");

    if (crushName === "anchal") {
        inputBox.classList.add("hidden");
        setTimeout(() => {
            imageBox.innerHTML = "";
            displayAnchalImages(imageBox);
            imageBox.style.display = "flex";
            complimentBox.style.display = "block";

            setTimeout(() => {
                imageBox.classList.add("show");
                changeCompliments();
                startImageRotation(imageBox);
            }, 100);
        }, 500);
    } else {
        alert("Enter 'Anchal' to see the magic!");
    }
}

function displayAnchalImages(imageBox) {
    anchalImages.forEach(imgSrc => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<figure class="image"><img src="${imgSrc}" alt="Anchal Image"></figure>`;
        imageBox.appendChild(card);
    });
}

function startImageRotation(imageBox) {
    setInterval(() => {
        let shuffledImages = anchalImages.sort(() => 0.5 - Math.random());
        let cards = imageBox.querySelectorAll(".card");
        cards.forEach((card, index) => {
            card.querySelector("img").src = shuffledImages[index];
        });
    }, 3000);
}

function changeCompliments() {
    let complimentBox = document.getElementById("complimentBox");
    setInterval(() => {
        complimentBox.classList.add("fade-out");
        setTimeout(() => {
            complimentIndex = (complimentIndex + 1) % compliments.length;
            complimentBox.innerHTML = compliments[complimentIndex];
            complimentBox.classList.remove("fade-out");
        }, 1000);
    }, 5000);
}
