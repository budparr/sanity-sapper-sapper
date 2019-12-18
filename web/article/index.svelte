<!-- <script context="module">
  import api from "../../ghost.js";

  export async function getPosts() {
    let posts = await api.posts
      .browse({ limit: 5, include: "tags,authors" })
      .then(posts => {
        posts.forEach(post => {
          console.log(post.title);
        });
      })
      .catch(err => {
        console.error(err);
      });

    return posts;
    
  }
  

  
</script>

<script>
  export let posts;
  console.log("api.posts:\n", posts);
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<div class="content">
  <ul>
    {#each posts as post}
    <li>
      <a rel="prefetch" href="blog/{post.slug}">
        <b>{post.title}</b>
      </a>
    </li>
    {/each}
  </ul>
</div> -->
