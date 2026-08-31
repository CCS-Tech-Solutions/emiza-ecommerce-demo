const recordingStatus =
    document.getElementById(
        "recording-status"
    );


const activityLog =
    document.getElementById(
        "activity-log"
    );


const orderStateBadge =
    document.getElementById(
        "orderStateBadge"
    );


const pageTitle =
    document.getElementById(
        "pageTitle"
    );


let updateCounter = 0;


/*
|--------------------------------------------------------------------------
| UTILITY
|--------------------------------------------------------------------------
*/


function getTime() {

    return new Date()
        .toLocaleTimeString();
}


function addLog(message) {

    const item =
        document.createElement("div");

    item.className =
        "log-item";

    item.innerHTML = `
        <span class="log-time">
            ${getTime()}
        </span>

        <span>
            ${message}
        </span>
    `;


    activityLog.prepend(item);
}


function getRecordingStatus() {

    return document.getElementById(
        "recording-status"
    );
}


function updateRecordingStatus(
    title,
    description,
    icon,
    extraText = ""
) {

    const recordingStatus =
        getRecordingStatus();


    recordingStatus.innerHTML = `

        <div class="status-icon">
            ${icon}
        </div>

        <div>

            <div class="status-title">
                ${title}
            </div>

            <div class="status-description">
                ${description}
            </div>

            ${extraText
            ? `
                        <div
                            style="
                                margin-top: 8px;
                                font-size: 11px;
                                font-family: monospace;
                                color: #6b7280;
                            "
                        >
                            ${extraText}
                        </div>
                    `
            : ""
        }

        </div>
    `;
}


/*
|--------------------------------------------------------------------------
| NORMAL ACTIVITY
|--------------------------------------------------------------------------
*/


document
    .getElementById("btnNormal")
    .addEventListener(
        "click",
        () => {

            updateRecordingStatus(

                "Order item scanned",

                "SKU verification completed successfully.",

                "✓",

                `EVENT_${Date.now()}`
            );


            orderStateBadge.textContent =
                "PROCESSING";

            orderStateBadge.className =
                "badge pending";


            addLog(
                "Normal warehouse activity detected"
            );
        }
    );


/*
|--------------------------------------------------------------------------
| START RECORDING
|--------------------------------------------------------------------------
*/


document
    .getElementById("btnStart")
    .addEventListener(
        "click",
        () => {

            /*
             * IMPORTANT:
             *
             * This text is what your extension
             * should detect.
             */

            updateRecordingStatus(

                "Camera workflow started",

                "START_RECORDING - Operator verification in progress.",

                "●",

                "START_RECORDING"
            );


            orderStateBadge.textContent =
                "RECORDING";

            orderStateBadge.className =
                "badge pending";


            addLog(
                "START_RECORDING trigger dynamically inserted into target DIV"
            );
        }
    );


/*
|--------------------------------------------------------------------------
| DYNAMIC UPDATE
|--------------------------------------------------------------------------
*/


document
    .getElementById("btnUpdate")
    .addEventListener(
        "click",
        () => {

            updateCounter++;


            updateRecordingStatus(

                "Operator activity in progress",

                `Dynamic warehouse event ${updateCounter} received.`,

                "↻",

                `PROCESSING_EVENT_${updateCounter}`
            );


            addLog(
                `Dynamic SPA update ${updateCounter} completed`
            );
        }
    );


/*
|--------------------------------------------------------------------------
| STOP RECORDING
|--------------------------------------------------------------------------
*/


document
    .getElementById("btnStop")
    .addEventListener(
        "click",
        () => {

            /*
             * IMPORTANT:
             *
             * This is the stop trigger.
             */

            updateRecordingStatus(

                "Operator verification completed",

                "STOP_RECORDING - Waiting for AWB confirmation.",

                "■",

                "STOP_RECORDING"
            );


            orderStateBadge.textContent =
                "COMPLETED";

            orderStateBadge.className =
                "badge pending";


            addLog(
                "STOP_RECORDING trigger dynamically inserted into target DIV"
            );
        }
    );


/*
|--------------------------------------------------------------------------
| CLEAR LOG
|--------------------------------------------------------------------------
*/


document
    .getElementById("clearLog")
    .addEventListener(
        "click",
        () => {

            activityLog.innerHTML = `
                <div class="log-item">

                    <span class="log-time">
                        ${getTime()}
                    </span>

                    <span>
                        Activity log cleared
                    </span>

                </div>
            `;
        }
    );


/*
|--------------------------------------------------------------------------
| SPA NAVIGATION SIMULATION
|--------------------------------------------------------------------------
*/


document
    .querySelectorAll(".nav-item")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".nav-item")
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );
                    });


                button.classList.add(
                    "active"
                );


                const page =
                    button.dataset.page;


                pageTitle.textContent =
                    `${page.charAt(0).toUpperCase() +
                    page.slice(1)
                    } Page`;


                /*
                 * Simulate SPA replacing the target DIV.
                 */

                const oldTarget =
                    document.getElementById(
                        "recording-status"
                    );


                const replacement =
                    oldTarget.cloneNode(true);


                replacement.innerHTML = `

                    <div class="status-icon">
                        ↻
                    </div>

                    <div>

                        <div class="status-title">

                            SPA Navigation Complete

                        </div>

                        <div class="status-description">

                            Target DIV was dynamically replaced.

                        </div>

                    </div>
                `;


                oldTarget.replaceWith(
                    replacement
                );


                /*
                 * Update global reference
                 */

                window.setTimeout(() => {

                    addLog(
                        `SPA navigation to ${page} completed. Target DIV replaced.`
                    );

                }, 50);
            }
        );

    });


/*
|--------------------------------------------------------------------------
| INITIAL LOG
|--------------------------------------------------------------------------
*/


addLog(
    "Dummy e-commerce SPA ready for testing"
);