<!-- <script context="module">
    // import posts from './_article.js';
  // const url = "https://budparr.ghost.io";
  // const key = "58d161c0eea90dd98cd65ef772";

  // export async function preload(page) {
  //   return this.fetch(url + "/ghost/api/v2/content/posts/?key=" + key)
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(data => {
  //       const pageName = page.path;
  //       data.posts = data.posts.filter(post => pageName.includes(post.slug));
  //       return { page: data.posts[0] };
  //     });
  // }



//   const api = new GhostContentAPI({
//   url: 'https://budparr.ghost.io',
//   key: '58d161c0eea90dd98cd65ef772',
//   version: "v3"
// });

// // fetch 5 posts, including related tags and authors
// api.posts
//     .browse({limit: 5, include: 'tags,authors'})
//     .then((posts) => {
//         posts.forEach((post) => {
//             console.log(post.title);
//         });
//     })
//     .catch((err) => {
//         console.error(err);
//     });





</script>

<script>
  export let page;
  //console.log("page", page);
</script>

<svelte:head>
  <title>{page.title}</title>
</svelte:head>

<div class="container bg-yellow-200">
  <h1>{page.title}</h1>
hi
  {#if page.feature_image}
  FEAUTRE
<img src="{page.feature_image}" alt="Featured Iimage">
{/if}

  {@html page.html}
</div> -->
