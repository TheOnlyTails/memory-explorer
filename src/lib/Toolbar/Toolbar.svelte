<script lang="ts">
  import { Button, ContentDialog, InfoBar, TextBlock, TextBox } from "fluent-svelte"
  import Add from "@fluentui/svg-icons/icons/add_24_regular.svg?raw"
  import Reset from "@fluentui/svg-icons/icons/delete_24_regular.svg?raw"
  import { objects } from "$lib/data"
  import ToolbarButton from "./ToolbarButton.svelte"

  let nameDialogOpen = false
  let name = ""
  let nameError = ""

  const createNewObject = () => {
    if (name in [...$objects.keys()]) {
      nameError = "Object with the same name already exists"
      return
    }

    if (name) {
      objects.update(v => v.set(name, []))
      name = ""
      nameError = ""
      nameDialogOpen = false
    }
  }

  const hotkeys = (e: KeyboardEvent) => {
    if (e.altKey) {
      if (e.key === "a") {
        nameDialogOpen = true
      }
    }
  }
</script>

<svelte:window on:keydown={hotkeys} />

<nav>
  <TextBlock variant="subtitle">Memory Explorer</TextBlock>

  <div class="buttons">
    <ToolbarButton icon={Add} on:click={() => nameDialogOpen = true}>
      Add a new memory object
    </ToolbarButton>
    <ToolbarButton icon={Reset} on:click={() => $objects = new Map()}>
      Clear all memory objects
    </ToolbarButton>
  </div>
</nav>

<ContentDialog bind:open={nameDialogOpen} title="New object">
  <div class="name-dialog">
    <TextBlock>Name:</TextBlock>
    <TextBox bind:value={name} on:keypress={(e) => {
      if (e.key === "Enter") createNewObject()
    }} />
  </div>

  {#if nameError}
    <InfoBar severity="critical">{nameError}</InfoBar>
  {/if}

  <svelte:fragment slot="footer">
    <Button on:click={() => nameDialogOpen = false}>Cancel</Button>
    <Button variant="accent" on:click={createNewObject}>Create</Button>
  </svelte:fragment>
</ContentDialog>

<style lang="scss">
	nav {
		display: flex;
		align-items: center;
		padding: 1ch 1rem;
		border-block-end: 1px solid var(--fds-divider-stroke-default);
		background: var(--fds-surface-stroke-default);
		border-radius: var(--fds-control-corner-radius);

		.buttons {
			display: flex;
			gap: 0.5rem;
      margin-inline: auto
		}
	}

	:global {
		.name-dialog {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			align-items: center;
		}
	}
</style>
