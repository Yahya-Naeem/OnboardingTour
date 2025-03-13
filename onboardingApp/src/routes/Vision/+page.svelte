<script>
    import { onMount } from 'svelte';

    let photos = [
        { id: 1, text: "Sample photo text", url: "https://via.placeholder.com/150" },
        { id: 2, text: "Another photo text", url: "https://via.placeholder.com/150" }
    ];

    let texts = [
        { id: 1, title: "Sample Text Title" },
        { id: 2, title: "Another Text Title" }
    ];

    let readings = [
        { id: 1, title: "Sample Reading Title" },
        { id: 2, title: "Another Reading Title" }
    ];

    let chosenPhotoId = -1;

    function handleMouseOverOldImage(photo) {
        chosenPhotoId = photo.id;
    }

    function handleRedirectToNewPhoto() {
        alert('Redirecting to new photo page');
    }

    function showImportDialog() {
        alert('Import dialog would be shown here');
    }

    function navigateToReading() {
        alert('Redirecting to reading page');
    }
</script>

<style>
    body {
        font-family: Arial, sans-serif;
    }
    .flex {
        display: flex;
    }
    .mobile-flex-col {
        flex-direction: column;
    }
    .lg-flex-row {
        flex-direction: row;
    }
    .gap-4 {
        gap: 1rem;
    }
    .w-full {
        width: 100%;
    }
    .h-full {
        height: 100%;
    }
    .bg-white {
        background-color: white;
    }
    .text-customGray {
        color: #718096;
    }
    .pb-2 {
        padding-bottom: 0.5rem;
    }
    .text-lg {
        font-size: 1.125rem;
    }
    .font-medium {
        font-weight: 500;
    }
    .p-2 {
        padding: 0.5rem;
    }
    .rounded-md {
        border-radius: 0.375rem;
    }
    .hover\:cursor-pointer:hover {
        cursor: pointer;
    }
    .overflow-hidden {
        overflow: hidden;
    }
    .aspect-square {
        aspect-ratio: 1 / 1;
    }
    .group-hover\:ring-2:hover {
        border: 2px solid #6554c0;
    }
    .transition-all {
        transition: all 0.3s;
    }
    .truncate {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .hover\:bg-tropicalIndigo-10:hover {
        background-color: rgba(101, 84, 192, 0.1);
    }
    .shadow-md {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .my-2 {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
    .gap-3 {
        gap: 0.75rem;
    }
    .w-full {
        width: 100%;
    }
    .h-auto {
        height: auto;
    }
    .py-3 {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
    }
    @media (max-width: 768px) {
        .lg-flex-row {
            flex-direction: column;
        }
    }
</style>

<div class="w-full h-full flex mobile-flex-col lg-flex-row gap-4" id="dashboard">
    <div class="lg-w-2/3 mobile-w-full flex flex-col gap-4">
        <!-- Photos Section -->
        <div class="bg-white text-customGray rounded-md shadow-md">
            <div class="pb-2 px-4">
                <h2 class="text-lg font-medium">Recent Photos</h2>
            </div>
            <div class="p-4">
                <div class="grid grid-cols-4 gap-3 mobile-max-h-32 lg-max-h-max">
                    {#each photos as photo}
                        <button on:mouseover={() => handleMouseOverOldImage(photo)}
                                on:mouseleave={() => { chosenPhotoId = -1 }}
                                class="relative rounded-md hover:cursor-pointer overflow-hidden aspect-square group">
                            {#if chosenPhotoId === photo.id}
                                <div class="text-left p-2 absolute top-0.5 whitespace-normal text-xs bg-white/70 rounded-md border border-tropicalIndigo z-10">
                                    {photo.text}
                                </div>
                            {/if}
                            <img src={photo.url} alt="" class="rounded-md w-full h-full object-cover group-hover:ring-2 ring-primaryIndigo transition-all" />
                        </button>
                    {/each}
                    <div class="aspect-square w-full h-full">
                        <button on:click={handleRedirectToNewPhoto}
                                class="flex flex-col justify-center items-center w-full h-full group hover-ring rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover-text-primaryIndigo transition-colors">
                                <path d="M21 15l-5-5L5 21" />
                                <path d="M21 10V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5" />
                                <path d="M16 16h5a2 2 0 0 0 2-2v-5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Import Section -->
        <div class="bg-white text-customGray rounded-md shadow-md">
            <div class="pb-2 px-4 flex items-center justify-between">
                <h2 class="text-lg font-medium">Recent Imported Texts</h2>
                <button on:click={showImportDialog} class="text-primaryIndigo hover:text-tropicalIndigo">
                    Import
                </button>
            </div>
            <div class="p-2">
                <div class="flex flex-col gap-2 shadow-md">
                    {#each texts as text}
                        <button on:click={navigateToReading} class="w-full text-left justify-start h-auto py-3 hover:bg-tropicalIndigo-10 rounded-md">
                            <div class="truncate">{text.title} ...</div>
                        </button>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Readings Section -->
        <div class="p-2">
            <h1 class="text-lg font-medium my-2">Readings for You</h1>
            <div class="flex flex-col gap-3">
                {#each readings as reading}
                    <button on:click={navigateToReading} class="w-full text-left justify-start h-auto py-3 hover:bg-tropicalIndigo-10 rounded-md">
                        <div class="truncate">{reading.title} ...</div>
                    </button>
                {/each}
            </div>
        </div>
    </div>

    <div class="lg-w-1/3 mobile-w-full flex flex-col gap-4">
        <!-- Streaks Section -->
        <div class="bg-white text-customGray rounded-md shadow-md p-4">
            <h2 class="text-lg font-medium">Streaks</h2>
            <div class="mt-4">
                <!-- Streaks content will be dynamically added here -->
            </div>
        </div>

        <!-- Goals Panel Section -->
        <div class="bg-white text-customGray rounded-md shadow-md p-4">
            <h2 class="text-lg font-medium">Goals</h2>
            <div class="mt-4">
                <!-- Goals content will be dynamically added here -->
            </div>
        </div>

        <!-- Word of the Day Section -->
        <div class="bg-white text-customGray rounded-md shadow-md p-4">
            <h2 class="text-lg font-medium">Word of the Day</h2>
            <div class="mt-4">
                <!-- Word of the Day content will be dynamically added here -->
            </div>
        </div>
    </div>
</div>