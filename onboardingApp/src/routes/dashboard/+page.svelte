<script>
    let avatar = null;
    let isProcessed = false;
    let isSubmitting = false;
    let remainingCount = 4;

    function onFileSelected(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                avatar = e.target.result;
                isProcessed = false;
                document.getElementById('learn').disabled = false;
            };
            reader.readAsDataURL(file);
        }
    }

    function handleClickOldImage(photo) {
        avatar = photo.url;
        document.getElementById('text').innerText = photo.text;
        document.getElementById('title').innerText = photo.title || '';
        isProcessed = true;
        document.getElementById('learn').disabled = true;
    }

    function handleChangeImage() {
        avatar = null;
        document.getElementById('text').innerText = '';
        document.getElementById('title').innerText = '';
        isProcessed = false;
        document.getElementById('learn').disabled = false;
    }

    function handleSubmit() {
        if (isSubmitting) {
            alert('Please kindly wait for the results to load.');
            return;
        }
        if (isProcessed) {
            alert('You have already made a request with this image.');
            return;
        }
        if (!avatar) {
            alert('Please upload an image.');
            return;
        }
        isSubmitting = true;
        document.getElementById('learn').disabled = true;
        // Simulate API call
        setTimeout(() => {
            alert('Learning content loaded.');
            isSubmitting = false;
            document.getElementById('learn').disabled = false;
        }, 2000);
    }
</script>

<style>
    .flex {
        display: flex;
    }
    .lg-flex-row {
        flex-direction: row;
    }
    .mobile-flex-col {
        flex-direction: column;
    }
    .gap-2 {
        gap: 8px;
    }
    .py-1 {
        padding-top: 4px;
        padding-bottom: 4px;
    }
    .items-center {
        align-items: center;
    }
    .w-full {
        width: 100%;
    }
    .aspect-video {
        aspect-ratio: 16 / 9;
    }
    .rounded-lg {
        border-radius: 8px;
    }
    .object-contain {
        object-fit: contain;
    }
    .bg-white {
        background-color: white;
    }
    .border {
        border: 1px solid #ccc;
    }
    .p-2 {
        padding: 8px;
    }
    .m-1 {
        margin: 4px;
    }
    .font-bold {
        font-weight: bold;
    }
    .text-center {
        text-align: center;
    }
    .text-xs {
        font-size: 0.75rem;
    }
    .text-gray-600 {
        color: #718096;
    }
    .px-2 {
        padding-left: 8px;
        padding-right: 8px;
    }
    .py-1 {
        padding-top: 4px;
        padding-bottom: 4px;
    }
    .rounded-full {
        border-radius: 9999px;
    }
    .transition-colors {
        transition: background-color 0.3s;
    }
    .duration-300 {
        transition-duration: 0.3s;
    }
    .bg-green-500 {
        background-color: #34d399;
    }
    .bg-blue-500 {
        background-color: #3490dc;
    }
    .bg-yellow-500 {
        background-color: #f6e05e;
    }
    .bg-red-500 {
        background-color: #e53e3e;
    }
    .bg-tropicalIndigo {
        background-color: #6554c0;
    }
    .hover\:bg-tropicalIndigo:hover {
        background-color: #6554c0;
    }
    .bg-green-200 {
        background-color: #48bb78;
    }
    .hover\:bg-green-200:hover {
        background-color: #48bb78;
    }
    .w-3/4 {
        width: 75%;
    }
    .my-2 {
        margin-top: 8px;
        margin-bottom: 8px;
    }
    .whitespace-normal {
        white-space: normal;
    }
    .h-min {
        height: min-content;
    }
    .z-0 {
        z-index: 0;
    }
    .hidden {
        display: none;
    }
    .w-16 {
        width: 4rem;
    }
    .h-16 {
        height: 4rem;
    }
    .ring-primaryIndigo {
        border: 2px solid #6554c0;
    }
    .hover\:ring:hover {
        border: 2px solid #6554c0;
    }
    .bg-white {
        background-color: white;
    }
    .hover\:cursor-pointer:hover {
        cursor: pointer;
    }
    @media (max-width: 768px) {
        .lg-flex-row {
            flex-direction: column;
        }
    }
</style>

<div class="flex lg-flex-row mobile-flex-col">
    <div class="flex flex-col gap-2 py-1 items-center lg-w-2/3 mobile-w-full">
        <div class="mb-2">
            <!-- Daily Free Count: 0 / 4 -->
        </div>
        <div id="preview" class="flex mobile-flex-col lg-flex-row justify-start w-full aspect-video gap-1">
            <img id="avatar" class="p-1 mobile-w-full lg-w-1/2 rounded-lg object-contain" src={avatar} alt="" />
            <div class="lg-w-1/2 p-2 m-1 border rounded bg-white">
                <div id="title" class="font-bold text-center"></div>
                <div id="text" class="whitespace-normal"></div>
            </div>
        </div>
        <div class="flex justify-center" id="img-icon" on:click={() => file.click()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-plus">
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                <line x1="16" x2="22" y1="5" y2="5" />
                <line x1="19" x2="19" y1="2" y2="8" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
        </div>
        <button id="upload-new-image" class="bg-white hover-bg-tropicalIndigo" on:click={handleChangeImage}>Upload new Image</button>
        <button id="learn" class="bg-green-200 hover-bg-tropicalIndigo" on:click={handleSubmit} disabled={isProcessed || !avatar}>Learn</button>
        <div class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 px-2 py-1 rounded-full">
            <div class="h-2 w-2 rounded-full bg-green-500 transition-colors duration-300"></div>
            <span id="remaining-count">Remaining Free Photos: {remainingCount}</span>
        </div>
        <div class="w-3/4 my-2 bg-white p-2 rounded-lg" id="image-slider">
            <div class="font-bold">Your photos</div>
            <div class="carousel-content">
                <!-- Photos will be dynamically added here -->
            </div>
        </div>
    </div>
    <div class="flex mobile-flex-col lg-flex-col justify-center lg-w-1/3 lg-ml-4 lg-mt-2 z-0 h-min gap-2">
        <div id="vocab-box" class="bg-white p-2 rounded-lg">
            <!-- Vocabulary content will be dynamically added here -->
        </div>
    </div>
</div>

<input class="hidden" id="file" type="file" accept="image/*" on:change={onFileSelected}>