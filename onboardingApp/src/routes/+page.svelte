<script>
    import Onboard from "$lib/Onboard.svelte";
    import Baby from "$lib/Baby.svelte";
    // let steps = ["step1", "step2","step3","step4","step5","step6"];
  </script>
  
  <main>
    <h1 id="1">Welcome to the App</h1>
    <div id = "child1">
        <Baby />
    </div> 
    <p >This is the next step!</p>
    <p >This is the 3 step!</p>
    <p >This is the 4 step!</p>
    <p >This is the 5 step!</p>
    <div id = "child2">
        <Baby />
    </div> 
    <p id="last">This is the 6 step!</p>
  
    <!-- <Onboard {steps} /> -->
    <Onboard /> 
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 2rem;
    }
  </style>
  