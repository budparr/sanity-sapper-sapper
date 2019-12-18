<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`posts.json`).then(r => r.json()).then(posts => {
      return { posts };
    });
  }
</script>

<script>
  export let posts;

</script>

<svelte:head>
  <title>Articles Page</title>
</svelte:head>

<style type="text/scss">
$color: red;
  p {
    color: $color;
  }
  </style>

<div class="container mx-auto px-4">
  <h1>Articles page</h1>
  {#each posts as post, index}
    {#if index}
      <hr />
    {/if}
    <div class="post-item">
      <h2>
        <a rel='prefetch' href='posts/{post.slug}'>{post.title}</a>
      </h2>
      <p>{post.excerpt}</p>
      <div class="post-item-footer">
        <span class="post-item-date">— {post.printDate}</span>
      </div>
    </div>
  {/each}
</div>
