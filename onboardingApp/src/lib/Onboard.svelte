<script>
  import { onMount } from "svelte";

   let steps = [];
  let currentStep = 0;

  onMount(() => {
      detectSteps();
      updateVisibility();
  });

  function detectSteps() {
      const start = document.getElementById("1");
      const end = document.getElementById("last");

      if (start && end) {
          let foundStart = false;
          let foundEnd = false;

          steps = Array.from(document.body.querySelectorAll("*")).filter((el) => {
              if (el === start) foundStart = true;
              if (el === end) foundEnd = true;
              return foundStart && !foundEnd ? true : el === end;
          });

          // Treat elements with "child" in id as a single step
          steps = steps.reduce((acc, el) => {
              if (el.id && el.id.includes("child")) {
                  acc.push(el); // Add the whole child component as one step
              } else if (!el.closest("[id^='child']")) {
                  acc.push(el);
              }
              console.log('steps',steps);
              return acc;
          }, []);
      }
  }

  function updateVisibility() {
      steps.forEach((element, index) => {
          element.style.display = index === currentStep || index < currentStep ? "block" : "none";
      });
  }

  function nextStep() {
      if (currentStep < steps.length - 1) {
          currentStep += 1;
          updateVisibility();
      }
  }
</script>

<button on:click={nextStep} class="onboarding-button">
  Continue
</button>

<style>
  .onboarding-button {
      margin-top: 10px;
      padding: 8px 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
  }

  .onboarding-button:hover {
      background-color: #0056b3;
  }
</style>
