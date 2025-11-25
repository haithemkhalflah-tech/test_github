let counter = document.querySelector(".counter");
let start_time = document.getElementById("start_time");
let last_time = document.querySelector(".last_time");
let record = document.querySelector(".record");
let ratio = document.querySelector(".ratio");
let z_img = document.getElementById("z_img");
let clicksound = new Audio("/music/cursor.mp3");

let intervalId = null;
let running = false;
let reel_start_time = 0; 

function increment() {
    if (!running) {
        counter.innerHTML = parseFloat(counter.innerHTML) + 1;

        const denominator = reel_start_time - parseFloat(last_time.innerHTML);
        if (denominator !== 0) {
            ratio.innerHTML = (parseFloat(counter.innerHTML) / denominator).toFixed(2);
        } else {
            ratio.innerHTML = "0";
        }

        clicksound.currentTime = 0;
        clicksound.play();
    }
}

function time() {
    let timeLeft = parseFloat(last_time.innerHTML);
    if (timeLeft > 0) {
        last_time.innerHTML = timeLeft - 1;
    } else {
        clearInterval(intervalId);
        intervalId = null;
        running = true;

        // Update record if needed
        if (parseInt(record.innerHTML) < parseInt(counter.innerHTML)) {
            record.innerHTML = counter.innerHTML;
        }

        counter.innerHTML = 0;
        ratio.innerHTML = "0";
    }
}

function start() {
    const value = parseInt(start_time.value, 10);

    if (Number.isInteger(value) && value > 0) {
        running = false;

        if (intervalId) clearInterval(intervalId);

        last_time.innerHTML = value;
        counter.innerHTML = 0;
        ratio.innerHTML = "0";
        reel_start_time = value;

        intervalId = setInterval(time, 1000);
        z_img.onclick = increment;
    } else {
        alert("Please enter a positive integer!");
    }
}

function initialize() {
    last_time.innerHTML = 0;
    counter.innerHTML = 0;
    ratio.innerHTML = "0";
    record.innerHTML = "0";
    reel_start_time = 0;
}
