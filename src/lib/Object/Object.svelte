<script lang="ts">
  import { type Object, objects, typeFromValue } from "$lib/data"
  import { draggable } from "@neodrag/svelte"
  import { Flyout, IconButton, TextBlock, TextBox, Tooltip } from "fluent-svelte"
  import Add from "@fluentui/svg-icons/icons/add_16_regular.svg?raw"

  export let name: string
  export let fields: Object["fields"][] = []

  let newFieldFlyoutOpen = false
  let newFieldName = ""
  let newFieldValue = ""

  const addNewField = () => {
    let fields = $objects.find((obj) => obj.name === name).fields
    fields = [...fields, {
      name: newFieldName,
      value: newFieldValue,
      type: typeFromValue(newFieldValue),
    }]
  }

</script>

<div class="object drag-handle" use:draggable={{ bounds: "parent" }}>
  <TextBlock variant="subtitle">{name}</TextBlock>
  {#if fields.length === 0}
    <table class="object-fields">
      {#each fields as field, i (field.name)}
        <tr class="object-field">
          <td class="object-field-name">{field.name}</td>
          <td class="object-field-value">{field.value}</td>
        </tr>
      {/each}
    </table>
  {/if}
  <Flyout bind:open={newFieldFlyoutOpen}>
    <Tooltip text="Add new field">
      <IconButton class="new-field-button" placement="bottom"
                  on:click={() => newFieldFlyoutOpen = true}>
        {@html Add}
      </IconButton>
    </Tooltip>
    <svelte:fragment slot="flyout">
      <TextBox placeholder="Field name" bind:value={newFieldName} />
      <TextBox placeholder="Field value" bind:value={newFieldValue} />
    </svelte:fragment>
  </Flyout>
</div>

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
</style>