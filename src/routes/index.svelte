<script lang="ts">
  import { objects } from "$lib/data"
  import { Object as ObjectTable } from "$lib"

  $: console.log([...$objects.entries()])
</script>

<main class="explorer">
  {#each [...$objects.entries()] as [name, fields] (name)}
    <ObjectTable {name} {fields} />
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