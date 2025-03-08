// script.js
// Butterfly Curve Logic
"use strict";
const { PI: π, E: e, sin, cos, pow, abs } = Math;
let c, ctx, W, H;

let paused = false;
let fc = 0;
let fid = 0;

let r = 0;
let θ = 0;
let scf = 50; // Increased scale factor for larger curve

let x = 0;
let y = 0;

let tempx = 0;
let tempy = 0;

const setup = () => {
    c = document.getElementById("Canvas");
    ctx = c.getContext("2d");
    [W, H] = setSize(c, ctx);
    window.onresize = () => {
        [W, H] = setSize(c, ctx);
        fc = 0;
    }
    window.requestAnimationFrame(animate);
};

const animate = () => {
    ctx.fillStyle = ctx.strokeStyle = `rgb(
        ${abs(sin(fc / 360)) * 255},
        ${abs(sin(fc / 360 + π / 6)) * 255},
        ${abs(sin(fc / 360 - π / 6)) * 255}
    )`;
    ctx.save();
    ctx.translate(W / 2, H / 2);
    tempx = x;
    tempy = y;
    r = pow(e, sin(θ)) - 2 * cos(4 * θ) + pow(sin((2 * θ - π) / 24), 5);
    r *= scf;
    x = r * cos(θ);
    y = -r * sin(θ);
    line(ctx, x, y, tempx, tempy);
    ctx.restore();
    θ = fc / 60;
    fc++;
    fid = window.requestAnimationFrame(animate);
};

const clear = (ctx = CanvasRenderingContext2D, color = "rgba(0, 0, 0, 1)", w = window.innerWidth, h = window.innerHeight) => {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
};

const line = (ctx = CanvasRenderingContext2D, x1 = 0, y1 = 0, x2 = 100, y2 = 100) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
};

const setSize = (c = HTMLCanvasElement, ctx = CanvasRenderingContext2D, w = window.innerWidth, h = window.innerHeight, pd = devicePixelRatio) => {
    c.style.width = `${w}px`;
    c.style.height = `${h}px`;
    c.width = w * pd;
    c.height = h * pd;
    ctx.scale(pd, pd);
    return [w, h];
};

window.onload = setup;

// Image and Compliment Logic
let compliments = [
    "💕 Your elegance and grace are truly captivating. ✨💕",
    "😍Your presence brings a sense of warmth and positivity 😍",
    "💖Your presence brings a sense of warmth and positivity. 😌💖",
    "🌟 even if the sky is falling down 🌟",
    "💘 Keep Smiling 💘",
    "🌷 no need to worry 🌷",
    "🎵Your inner beauty radiates and complements your outer beauty. 🎵",
    "💞 You are most Beautiful 💞",
    "💎 Always be happy💎",
    " 😍 Your kind and compassionate nature shines brightly😍 😍 "
    
];

let complimentIndex = 0;
let anchalImages = ["photo1.png", "photo2.png", "photo3.png", "photo4.png", "photo5.png", "photo6.png", "photo7.png", "photo8.png", "photo9.png"];

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
        alert("Enter Anchal to see the magic!");
    }
}

function displayAnchalImages(imageBox) {
    for (let i = 0; i < 1; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<figure class="image"><img src="" alt="Anchal Image"></figure>`;
        imageBox.appendChild(card);
    }
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
