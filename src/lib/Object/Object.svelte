<script lang="ts">
  import { type Field, objects, typeFromValue } from "$lib/data"
  import { draggable } from "@neodrag/svelte"
  import { Button, ContentDialog, IconButton, TextBlock, TextBox, Tooltip } from "fluent-svelte"
  import Add from "@fluentui/svg-icons/icons/add_16_regular.svg?raw"
  import { onMount } from "svelte"

  export let name: string
  export let fields: Field[] = []

  let newFieldDialogOpen = false
  let newFieldName = ""
  let newFieldValue = ""

  const addNewField = () => {
    if (fields.filter(field => field.key === newFieldName).length === 0) {
      objects.update(v => v.set(name, v.get(name).concat({
          key: newFieldName,
          value: newFieldValue,
          type: typeFromValue(newFieldValue)
        }))
      )
      newFieldDialogOpen = false
      newFieldName = ""
      newFieldValue = ""
    }
  }

  // let fieldValueInput: HTMLInputElement
  // onMount(() => {
  //   if (fieldValueInput.validity.patternMismatch)
  //     fieldValueInput.setCustomValidity(`The value must be an int, double, string, boolean, object address, or null.`)
  // })
</script>

<div class="object drag-handle" use:draggable={{ bounds: "parent" }}>
  <TextBlock variant="subtitle">{name}</TextBlock>
  {#if fields.length > 0}
    <table class="object-fields">
      {#each fields as field, i (field.key)}
        <tr class="object-field">
          <td class="object-field-name">
            <pre><code>{field.key}</code></pre>
          </td>
          <td class="object-field-value">
            <pre><code>{field.value}</code></pre>
          </td>
        </tr>
      {/each}
    </table>
  {/if}
  <Tooltip text="Add new field" placement="bottom">
    <IconButton class="new-field-button" on:click={() => newFieldDialogOpen = true}>
      {@html Add}
    </IconButton>
  </Tooltip>
</div>

<ContentDialog bind:open={newFieldDialogOpen} title="New field">
  <form on:submit|preventDefault={addNewField} id="new-field-form">
    <TextBox bind:value={newFieldName} required placeholder="Field name" />
    <TextBox bind:value={newFieldValue} placeholder="Field value"
             required pattern='^"[\w\s]*"|\d+\.\d+|\d+|true|false|@\w+|null$'
    />
  </form>

  <svelte:fragment slot="footer">
    <Button on:click={() => newFieldDialogOpen = false}>Cancel</Button>
    <Button form="new-field-form" variant="accent">Add field</Button>
  </svelte:fragment>
</ContentDialog>

<style lang="scss">
	.object {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1ch;
		max-inline-size: fit-content;
		justify-content: flex-start;
		padding: 1ch 1rem;
		margin: 1rem;
		background: var(--fds-surface-stroke-default);
		border-radius: var(--fds-control-corner-radius);
		user-select: none;
	}

	:global {
		#new-field-form {
			display: flex;
			flex-direction: column;
			gap: 1ch;
		}
	}
</style>