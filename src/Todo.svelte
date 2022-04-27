<script>
    import { items } from "./stores.js";
    import { v4 as uuidv4 } from "uuid";

    let text;

    function handleAdd() {
        $items = [
            ...$items,
            {
                id: uuidv4(),
                text: text,
            },
        ];
        text = null;
    }

    function handleRemove(id) {
        $items = $items.filter((t) => t.id != id);
    }
</script>

<div>
    <input bind:value={text} />
    <button on:click={handleAdd}>+</button>
    <div>{text || ""}</div>
</div>

<div>
    {#each $items as item}
        <input disabled value={item.text} />
        <button on:click={handleRemove(item.id)}>-</button>
    {/each}
</div>
