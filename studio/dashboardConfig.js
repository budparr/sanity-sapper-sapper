export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-blog'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5df50df596dfb2ec2e6d64e1',
                  title: 'Sanity Studio',
                  name: 'sanity-sapper-sapper-studio',
                  apiId: '47e1d961-5a20-4904-a3a9-7e942bb9e0f5'
                },
                {
                  buildHookId: '5df50df5922467263c8adfcf',
                  title: 'Blog Website',
                  name: 'sanity-sapper-sapper',
                  apiId: 'f013b441-1f50-4645-a427-c9e99f7a9931'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/budparr/sanity-sapper-sapper',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://sanity-sapper-sapper.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
