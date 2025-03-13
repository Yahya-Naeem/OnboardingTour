<script>
    let reading = null;
    let isRevealed = false;
    let waiting = false;
    let chosenReason = "";
    let showPaywallModal = false;
    let readingCount = 0;
    const remainingCount = 4;

    async function getReadingComprehension() {
        if (waiting) {
            alert('Please wait for the next reading to load.');
            return;
        }
        waiting = true;
        try {
            // Simulate fetching data
            const readingData = {
                text: "This is a sample reading text.",
                qAndA: {
                    question: "What is the main idea of the text?",
                    answers: ["Idea 1", "Idea 2", "Idea 3", "Idea 4"],
                    correctKey: "1"
                }
            };
            reading = readingData;
            isRevealed = false;
        } catch (e) {
            alert('System error. Please try again later.');
        } finally {
            waiting = false;
        }
    }

    function revealAnswer(key, correctKey) {
        if (!reading || isRevealed) {
            alert('You have already answered the question. Click continue to move on.');
            return;
        }
        isRevealed = true;
        const isRight = key === correctKey;
        if (isRight) {
            alert('🎉Correct! +10 Points. Click continue to move on.');
        } else {
            alert('Incorrect. Click on each answer to see their translation');
        }
    }

    function continueReading() {
        if (!isRevealed) {
            alert('Please answer the question before continuing.');
            return;
        }
        alert('Getting a new reading for you!');
        getReadingComprehension();
    }

    function showReportPopup() {
        const reportPopup = document.getElementById('report-popup');
        reportPopup.classList.remove('hidden');
    }

    function closeReportPopup() {
        const reportPopup = document.getElementById('report-popup');
        reportPopup.classList.add('hidden');
    }

    function handleReport() {
        if (chosenReason.length === 0) {
            alert('Please select a reason for reporting this reading.');
            return;
        }
        alert('Thank you for reporting this reading. We will review it shortly.');
        closeReportPopup();
    }

    function feStrEqIgnCase(a, b) {
        return a.toLowerCase() === b.toLowerCase();
    }

    function navigateToPage(page) {
        window.location.href = `/${page}`;
    }

    $: document.getElementById('continue-button').disabled = false;
    getReadingComprehension();
</script>

<style>
    /* Add your CSS here */
    .flex { display: flex; }
    .lg-flex-row { flex-direction: row; }
    .mobile-flex-col { flex-direction: column; }
    .w-full { width: 100%; }
    .bg-primaryWhite { background-color: #f8f9fa; }
    .text-base { font-size: 1rem; }
    .text-sm { font-size: 0.875rem; }
    .mt-2 { margin-top: 0.5rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .p-2 { padding: 0.5rem; }
    .pb-5 { padding-bottom: 1.25rem; }
    .rounded-lg { border-radius: 0.5rem; }
    .bg-white { background-color: white; }
    .drop-shadow-sm { box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); }
    .font-bold { font-weight: bold; }
    .items-center { align-items: center; }
    .gap-2 { gap: 0.5rem; }
    .stroke-gray-300 { stroke: #e2e8f0; }
    .hover\:stroke-primaryIndigo:hover { stroke: #6554c0; }
    .text-left { text-align: left; }
    .bg-tropicalIndigo { background-color: #6554c0; }
    .hover\:bg-tropicalIndigo:hover { background-color: #6554c0; }
    .hover\:ring:hover { border: 1px solid #6554c0; }
    .bg-green-200 { background-color: #48bb78; }
    .bg-red-200 { background-color: #f6e05e; }
    .h-2 { height: 0.5rem; }
    .w-2 { width: 0.5rem; }
    .rounded-full { border-radius: 9999px; }
    .transition-colors { transition: background-color 0.3s; }
    .duration-300 { transition-duration: 0.3s; }
    .text-xs { font-size: 0.75rem; }
    .font-medium { font-weight: 500; }
    .text-gray-600 { color: #718096; }
    .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
    .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
    .ring-primaryIndigo { border: 1px solid #6554c0; }
    .lg-grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
    .mobile-grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
    .gap-4 { gap: 1rem; }
    .lg-mb-4 { margin-bottom: 1rem; }
    .mobile-mb-2 { margin-bottom: 0.5rem; }
    .h-10 { height: 2.5rem; }
    .lg-h-12 { height: 3rem; }
    .lg-mt-12 { margin-top: 3rem; }
    .whitespace-normal { white-space: normal; }
    .grid { display: grid; }
    @media (max-width: 768px) {
        .lg-flex-row { flex-direction: column; }
        .lg-grid-cols-2 { grid-template-columns: repeat(1, 1fr); }
    }
</style>

<div class="flex lg-flex-row mobile-flex-col w-full bg-primaryWhite lg-text-base mobile-text-sm">
    <div class="flex flex-col lg-w-2/3 mobile-w-full">
        <div class="mt-2 whitespace-normal mobile-mb-2" id="reading-box">
            <div id="reading-content" class="relative flex flex-col items-center p-2 pb-5 mb-2 rounded-lg bg-white drop-shadow-sm">
                <div class="w-full flex justify-between items-center font-bold mb-2">
                    <div id="reading-audio" class="flex items-center gap-2 relative">
                        Reading
                    </div>
                    <div class="flex gap-4">
                        <button on:click={() => navigateToPage('history')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-gray-300 hover-stroke-primaryIndigo">
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
                                <path d="M21 21H7a2 2 0 0 1 2-2V9" />
                                <path d="M3 10v6" />
                                <path d="M21 10v6" />
                            </svg>
                        </button>
                        <button on:click={showReportPopup}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-gray-300 hover-stroke-primaryIndigo">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12" y2="16" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="reading-text" class="whitespace-normal">
                    {reading?.text}
                </div>
            </div>
            <div class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 px-2 py-1 rounded-full">
                <div class="h-2 w-2 rounded-full bg-green-500 transition-colors duration-300"></div>
                <span id="remaining-count">Remaining Free Exercises: {remainingCount}</span>
            </div>
            <div id="reading-question" class="relative my-3 rounded ring-primaryIndigo bg-tropicalIndigo drop-shadow-sm whitespace-normal">
                <div id="question-text" class="whitespace-normal">
                    {reading?.qAndA.question}
                </div>
            </div>
            <div id="reading-answer" class="text-left relative grid lg-grid-cols-2 mobile-grid-cols-1 gap-2 lg-mb-4 mobile-mb-2">
                {#if reading}
                    {#each reading.qAndA.answers as answer, index}
                        <button on:click={() => revealAnswer(index.toString(), reading.qAndA.correctKey)} class="text-left bg-white rounded hover:bg-tropicalIndigo p-2 hover:ring">
                            {answer}
                        </button>
                    {/each}
                {/if}
            </div>
            <div id="reading-action" class="w-full whitespace-normal gap-2 mobile-h-10 lg-h-12 lg-mt-12">
                <div class="flex h-full w-full">
                    <button id="continue-button" class="w-full bg-white rounded-full hover-ring hover-bg-white" on:click={continueReading} disabled={!isRevealed}>
                        Continue
                    </button>
                </div>
            </div>
            <div id="report-popup" class="hidden">
                <div class="bg-white p-4 rounded-lg shadow-lg">
                    <p>Please select a reason for reporting this reading:</p>
                    <div class="grid lg-grid-cols-2 mobile-grid-cols-1 gap-2 mt-4">
                        <!-- Report reasons will be dynamically added here -->
                    </div>
                    <div class="flex justify-end mt-4">
                        <button on:click={handleReport}>Submit</button>
                        <button on:click={closeReportPopup}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="my-words-box" class="flex flex-col justify-center lg-w-1/3 lg-ml-4 lg-mt-2 h-min gap-2">
        <div class="bg-white p-2 rounded-lg">
            <!-- Vocabulary content will be dynamically added here -->
        </div>
    </div>
</div>