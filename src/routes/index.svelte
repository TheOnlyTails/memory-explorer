<script lang="ts">
  import { onMount } from "svelte"
  import { objects } from "$lib/data"
  import { Object } from "$lib"

  onMount(() => {
    // panzoom(document.body, { minZoom: 0.5, maxZoom: 10, bounds: true })
  })
</script>

<main class="explorer">
  {#each [...$objects] as { name, fields } (name)}
    <Object {name} {fields} />
  {/each}
</main>

<style lang="scss">
  main {
    max-inline-size: calc(100vw - 1rem);
    margin: 0 1ch 1ch 0;
    background: url(/backdrop.svg) repeat;
  }

	.main-backdrop {
		z-index: -1;
		transform: translate(-50%, -50%);
		block-size: 600%;
		inline-size: 600%;
	}
</style>