
const activityLog = document.getElementById("activity-log");
const orderStateBadge = document.getElementById("orderStateBadge");
const pageTitle = document.getElementById("pageTitle");
const orderNumber = document.getElementById("orderNumber");
const awbNumber = document.getElementById("awbNumber");

let updateCounter = 0;
let orderCounter = 1;

function getTime() {
    return new Date().toLocaleTimeString();
}

function addLog(message) {
    const item = document.createElement("div");
    item.className = "log-item";
    item.innerHTML = `
        <span class="log-time">${getTime()}</span>
        <span>${message}</span>
    `;
    activityLog.prepend(item);
}

function generateAwb() {
    return String(
        Math.floor(100000000000 + Math.random() * 900000000000)
    );
}

function updateRecordingStatus(title, description, icon, triggerText = "") {
    const target = document.getElementById("recording-status");

    target.innerHTML = `
        <div class="status-icon pending-icon">${icon}</div>
        <div>
            <div class="status-title">${title}</div>
            <div class="status-description">${description}</div>
            ${triggerText ? `
                <div style="
                    margin-top: 8px;
                    font-size: 11px;
                    font-family: monospace;
                    color: #6b7280;
                ">${triggerText}</div>
            ` : ""}
        </div>
    `;
}

/* NEW ORDER */
document.getElementById("btnNormal").addEventListener("click", () => {
    const sequence = String(orderCounter).padStart(3, "0");
    const newOrderId = `#ORD-20260827-${sequence}`;
    const newAwb = generateAwb();

    if (orderNumber) orderNumber.textContent = newOrderId;
    if (awbNumber) awbNumber.textContent = newAwb;

    updateRecordingStatus(
        "Starting the new order",
        `New order ${newOrderId} has been created and is ready for processing.`,
        "↻",
        `NEW_ORDER | ${newOrderId} | Flipkart`
    );

    orderStateBadge.textContent = "PENDING";
    orderStateBadge.className = "badge pending";

    addLog(`New order created: ${newOrderId}`);
    if (awbNumber) addLog(`AWB generated: ${newAwb}`);

    orderCounter++;
});

/* START RECORDING — exact trigger retained */
document.getElementById("btnStart").addEventListener("click", () => {
    updateRecordingStatus(
        "Recording started",
        "START_RECORDING - Operator verification in progress.",
        "●",
        "START_RECORDING"
    );

    orderStateBadge.textContent = "RECORDING";
    orderStateBadge.className = "badge pending";

    addLog("START_RECORDING trigger dynamically inserted into target DIV");
});

/* PACK NEXT — no recording trigger */
document.getElementById("btnUpdate").addEventListener("click", () => {
    updateCounter++;

    updateRecordingStatus(
        "Packing order",
        `Pack Next completed. Package ${updateCounter} is ready for the next fulfilment step.`,
        "⚡",
        `PACK_NEXT | PACKAGE_${updateCounter}`
    );

    orderStateBadge.textContent = "PACKING";
    orderStateBadge.className = "badge pending";

    addLog("Pack Next completed for current order");
});

/* STOP RECORDING — exact trigger retained */
document.getElementById("btnStop").addEventListener("click", () => {
    updateRecordingStatus(
        "Order processing completed",
        "STOP_RECORDING - Waiting for AWB confirmation.",
        "■",
        "STOP_RECORDING"
    );

    orderStateBadge.textContent = "COMPLETED";
    orderStateBadge.className = "badge pending";

    addLog("STOP_RECORDING trigger dynamically inserted into target DIV");
});

/* CLEAR LOG */
document.getElementById("clearLog").addEventListener("click", () => {
    activityLog.innerHTML = `
        <div class="log-item">
            <span class="log-time">${getTime()}</span>
            <span>Activity log cleared</span>
        </div>
    `;
});

/* SPA NAVIGATION */
document.querySelectorAll(".nav-item").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".nav-item").forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        const page = button.dataset.page;
        pageTitle.textContent =
            `${page.charAt(0).toUpperCase() + page.slice(1)} Page`;

        const oldTarget = document.getElementById("recording-status");
        const replacement = oldTarget.cloneNode(true);

        replacement.innerHTML = `
            <div class="status-icon pending-icon">↻</div>
            <div>
                <div class="status-title">SPA Navigation Complete</div>
                <div class="status-description">
                    Target DIV was dynamically replaced.
                </div>
            </div>
        `;

        oldTarget.replaceWith(replacement);

        window.setTimeout(() => {
            addLog(`SPA navigation to ${page} completed. Target DIV replaced.`);
        }, 50);
    });
});

addLog("Demo workstation initialized");
