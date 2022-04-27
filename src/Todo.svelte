<script>
    import { items } from "./stores.js";
    import { v4 as uuidv4 } from "uuid";

    let text;

    const handleAdd = () => {
        if (!text) return {};

        $items = [
            ...$items,
            {
                id: uuidv4(),
                text: text,
            },
        ];
        text = null;
    };

    const onKeyPress = (e) => {
        if (e.charCode === 13) handleAdd();
    };
    const handleRemove = (id) => {
        $items = $items.filter((t) => t.id != id);
    };
</script>

<div>
    <input bind:value={text} placeholder="todo" on:keypress={onKeyPress} />
    <button on:click={handleAdd} disabled={!text} title="Add">+</button>
</div>

<div>
    {#each $items as item}
        <input disabled value={item.text} />
        <button on:click={handleRemove(item.id)} title="Remove">-</button>
    {/each}
</div>
