<script lang="ts">
  import { IconButton, Tooltip } from "fluent-svelte"

  export let icon: `${string}?raw`
</script>

<Tooltip placement="bottom">
  <IconButton on:click>
    {@html icon}
  </IconButton>
  <svelte:fragment slot="tooltip">
    <slot />
  </svelte:fragment>
</Tooltip>