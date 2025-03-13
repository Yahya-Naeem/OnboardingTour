<script>
    import { onMount } from "svelte";
    import { ONBOARD_TASK_STEPS_BY_PAGE } from "$lib/client/feConstants";

    let currentStep = 0;
    let stepElements = []; // Array to hold grouped step elements
    let continueButton; // Reference to the Continue button
    let continueButtonContainer; // Container for the Continue button and content

    onMount(() => {
        detectSteps();
        updateVisibility();
        positionContinueButton();
    });

    function detectSteps() {
        const stepData = ONBOARD_TASK_STEPS_BY_PAGE['vision'].step1;

        stepElements = stepData
            .map(step => {
                if (step.id) {
                    const ids = Array.isArray(step.id) ? step.id : [step.id];
                    return ids
                        .map(id => document.getElementById(id))
                        .filter(el => el !== null); // Filter out any null values
                }
                return [];
            })
            .filter(group => group.length > 0); // Remove empty groups
    }

    function updateVisibility() {
        stepElements.forEach((group, index) => {
            group.forEach(element => {
                if (index <= currentStep) {
                    element.classList.remove("hidden"); // Show the element
                } else {
                    element.classList.add("hidden"); // Hide the element
                }
            });
        });
    }

    function positionContinueButton() {
        // Remove the existing button container (if it exists)
        if (continueButtonContainer) {
            continueButtonContainer.remove();
        }

        // Get the last visible element in the current step
        const lastVisibleElement = stepElements[currentStep]?.[stepElements[currentStep].length - 1];

        if (lastVisibleElement) {
            // Check if the last visible element is `my-words-box`
            const isMyWordsBox = lastVisibleElement.id === "my-words-box";

            // Create a container for the Continue button and content
            continueButtonContainer = document.createElement("div");
            continueButtonContainer.className = isMyWordsBox
                ? "onboarding-box my-words-box-button bg-tropicalIndigo"
                : "onboarding-box bg-tropicalIndigo";

            // Add inline styles for the purple background
            continueButtonContainer.class = "bg-tropicalIndigo"; // Purple background
            continueButtonContainer.style.padding = "20px";
            continueButtonContainer.style.borderRadius = "8px";
            continueButtonContainer.style.marginTop = "20px";
            continueButtonContainer.style.display = "flex";
            continueButtonContainer.style.flexDirection = "column";
            continueButtonContainer.style.alignItems = "center";
            continueButtonContainer.style.position = "relative"; // For the pointing tip

            // Add content to the container
            const content = document.createElement("div");
            content.className = "onboarding-content";
            content.textContent = ONBOARD_TASK_STEPS_BY_PAGE['vision'].step1[currentStep]?.content || "";
            content.style.color = "white"; // White text for better contrast
            content.style.marginBottom = "10px"; // Spacing between content and button
            content.style.textAlign = "center";
            continueButtonContainer.appendChild(content);

            // Create the Continue button
            continueButton = document.createElement("button");
            continueButton.textContent = "Continue";
            continueButton.className = "onboarding-button";

            // Add inline styles for the button
            continueButton.style.marginTop = "10px";
            continueButton.style.padding = "8px 12px";
            continueButton.style.backgroundColor = "#007bff";
            continueButton.style.color = "white";
            continueButton.style.border = "none";
            continueButton.style.borderRadius = "4px";
            continueButton.style.cursor = "pointer";

            // Add hover effect for the button
            continueButton.addEventListener("mouseenter", () => {
                continueButton.style.backgroundColor = "#0056b3";
            });
            continueButton.addEventListener("mouseleave", () => {
                continueButton.style.backgroundColor = "#007bff";
            });

            // Add click event listener to the button
            continueButton.addEventListener("click", nextStep);

            // Append the button to the container
            continueButtonContainer.appendChild(continueButton);

            // Insert the container after the last visible element
            if (isMyWordsBox) {
                // Embed the container inside `my-words-box`
                lastVisibleElement.appendChild(continueButtonContainer);
            } else {
                // Insert the container below the last visible element
                lastVisibleElement.insertAdjacentElement("afterend", continueButtonContainer);
            }

            // Add a pointing tip to the onboarding box
            const pointingTip = document.createElement("div");
            pointingTip.className = "pointing-tip";
            continueButtonContainer.appendChild(pointingTip);
        }
    }

    function nextStep() {
        if (currentStep < stepElements.length - 1) {
            currentStep += 1;
            updateVisibility();
            positionContinueButton(); // Reposition the button after updating the step
        }
    }
</script>

<style>
    /* Class to hide elements */
    .hidden {
        display: none;
    }

    /* Container for the Continue button and content */
    .onboarding-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        border-radius: 8px;
        margin-top: 20px; /* Add spacing below the current element */
        position: relative; /* For the pointing tip */
    }

    /* Content styling */
    .onboarding-content {
        color: white; /* White text for better contrast */
        margin-bottom: 10px; /* Spacing between content and button */
        text-align: center;
    }

    /* Specific styles for the button inside `my-words-box` */
    .my-words-box-button {
        width: 100%; /* Take full width of the parent */
    }

    /* Pointing tip to connect the onboarding box to the current element */
    .pointing-tip {
        position: absolute;
        top: -10px; /* Position above the container */
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        z-index: 1000; /* Ensure the tip is above other elements */
    }
</style>