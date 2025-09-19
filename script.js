// Generate or get unique device ID
let deviceId = localStorage.getItem("deviceId");
if (!deviceId) {
    deviceId = crypto.randomUUID(); // unique ID per browser/device
    localStorage.setItem("deviceId", deviceId);
}

let daleNumber = document.querySelector("#daleNumber");
let globalDaleNumber = document.querySelector("#global-daleNumber");
let dales = 0;
let pendingDales = 0;

// Load per-device dales from KV on page load
async function loadLocalDales() {
    try {
        const res = await fetch(`https://dale-ws.240.workers.dev?device=${deviceId}`);
        const data = await res.json();
        dales = data.user || 0;
        daleNumber.innerHTML = dales;
    } catch (err) {
        console.error("Failed to load local dales:", err);
    }
}

// Connect WebSocket to Durable Object for global dales
const ws = new WebSocket("wss://dale-ws.240.workers.dev/gdo");
ws.onmessage = (event) => {
    globalDaleNumber.innerHTML = event.data;
};

// Update local display
function updateDales() {
    daleNumber.innerHTML = dales;
}

// Handle click on dice faces
function clickFace(el) {
    const value = parseInt(el.dataset.val);

    // Update local display immediately
    dales += value;
    pendingDales += value;
    updateDales();

    // Send increment to global counter via WebSocket
    ws.send(value.toString());
}

// Send pending dales to KV every second
setInterval(async () => {
    if (pendingDales > 0) {
        const sendValue = pendingDales;
        pendingDales = 0;

        try {
            const res = await fetch(`https://dale-ws.240.workers.dev?device=${deviceId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ add: sendValue })
            });

            if (!res.ok) {
                console.error("Failed to sync dales:", await res.text());
                pendingDales += sendValue; // retry next tick
                return;
            }

            const data = await res.json();
            dales = data.user; // sync local total with KV
            updateDales();
        } catch (err) {
            console.error("Failed to sync dales to DB:", err);
            pendingDales += sendValue; // retry next tick
        }
    }
}, 1000);

// Build dice faces
let icosahedron = document.querySelector(".icosahedron");
for (let i = 0; i < 20; i++) {
    const daleIndex = i % 10;
    icosahedron.innerHTML += `<figure class="face" id="face${i}" data-val=${i} onclick="clickFace(this)">
        <div class="content"><p>${i}</p><img src="dales/dale${daleIndex}.jpg"></div>
    </figure>`;
}

// Load local dales on page load
window.addEventListener("load", loadLocalDales);