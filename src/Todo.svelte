<script>
    import { items } from "./stores.js";
    import { v4 as uuidv4 } from "uuid";
    import { quintOut } from "svelte/easing";
    import { crossfade } from "svelte/transition";

    let text;

    const [send, receive] = crossfade({
        duration: (d) => Math.sqrt(d * 200),

        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === "none" ? "" : style.transform;

            return {
                duration: 600,
                easing: quintOut,
                css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
            };
        },
    });

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

    const handleRemove = (item) => {
        $items = $items.filter((t) => t != item);
    };
</script>

<div>
    <input
        placeholder="todo"
        bind:value={text}
        on:keydown={(e) => e.key === "Enter" && handleAdd()}
    />
    <button on:click={handleAdd} disabled={!text} title="Add">+</button>
</div>

{#each $items as item}
    <div in:receive={{ key: item.id }} out:send={{ key: item.id }}>
        <input disabled value={item.text} />
        <button on:click={handleRemove(item)} title="Remove">-</button>
    </div>
{/each}
