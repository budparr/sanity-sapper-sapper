<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<script context="module">
  
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    const res = await this.fetch(`posts/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data };
      console.log("data: ", data);
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>  
  // import Bio from "../../components/Bio.svelte";
  export let post;
</script>


<style>
  .bg-gr {
    @apply bg-gray-200;
  }
</style>

<div class="bg-gr">
  <div class="container">
    <header class="py-20 text-center">
      <p class="text-gray-300f">{post.printDate} ~ {post.printReadingTime}</p>
      <h1 class="text-7xl mb-2">{post.title}</h1>

      <hr />
    </header>
    <div class="container mx-auto">
      <article class="px-20 content text-2xl">
        {@html post.html}
      </article>
      <hr class="text-black mx-auto text-center"/>
      <!-- <Bio /> -->
    </div>
  </div>
</div>
