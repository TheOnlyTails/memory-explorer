<script lang="ts">
  import { Button, ContentDialog, TextBlock, TextBox } from "fluent-svelte"
  import Add from "@fluentui/svg-icons/icons/add_16_regular.svg?raw"
  import Reset from "@fluentui/svg-icons/icons/arrow_reset_20_regular.svg?raw"
  import { objects } from "$lib/data"
  import ToolbarButton from "./ToolbarButton.svelte"

  let nameDialogOpen = false
  let name = ""

  const createNewObject = () => {
    nameDialogOpen = false

    if (name) {
      $objects = [...$objects, { name }]
    }
  }

  const hotkeys = (e: KeyboardEvent) => {
    if (e.altKey) {
      if (e.key === "A") {
        nameDialogOpen = true
      }
    }
  }
</script>

<svelte:window on:keydown={hotkeys} />

<nav>
  <TextBlock variant="subtitle">Memory Explorer</TextBlock>

  <ToolbarButton icon={Add} on:click={() => nameDialogOpen = true}>
    Add a new memory object
  </ToolbarButton>
  <ToolbarButton icon={Reset}>
    Clear all memory objects
  </ToolbarButton>
</nav>

<ContentDialog open={nameDialogOpen} title="New object">
  <div class="name-dialog">
    <TextBlock>Name:</TextBlock>
    <TextBox bind:value={name} on:keypress={(e) => {
      if (e.key === "Enter") createNewObject()
    }} />
  </div>

  <svelte:fragment slot="footer">
    <Button on:click={() => nameDialogOpen = false}>Cancel</Button>
    <Button variant="accent" on:click={createNewObject}>Create</Button>
  </svelte:fragment>
</ContentDialog>

<style lang="scss">
	nav {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1ch 1rem;
		border-block-end: 1px solid var(--fds-divider-stroke-default);
    background: var(--fds-surface-stroke-default);
    border-radius: var(--fds-control-corner-radius);
	}

	:global {
		.name-dialog {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			align-items: center;
		}
	}
</style>
