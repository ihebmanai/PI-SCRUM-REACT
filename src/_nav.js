export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info'
      },
    },
    {
      title: true,
      name: 'SCRUM Project Managment',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Projects',
      url: '/theme/colors',
      icon: 'icon-film',
      children: [
        {
          name: 'Add project',
          url: '/Projects/AddProject',
          icon: 'icon-pencil',
        },
        {
          name: 'Projects statistic',
          url: '/Projects/CurrentProject',
          icon: 'icon-clock',
        },
        {
          name: 'All Projects',
          url: '/Projects/ProjectList',
          icon: 'icon-grid',
        }]
    },
    {     name: 'Backlog',
          url: '/Projects/BacklogProject',
          icon: 'icon-list',
      children: [
        {
          name: 'Add Backlog',
          url:'/Projects/AddBacklog',
          icon: 'icon-pencil',
        },{
          name: 'Update Backlog',
          url: '/Projects/BacklogProject',
          icon: 'icon-list',
        }]
    },
    {
      name: 'Releases',
      url: '/Projects/DragDrop',
      icon: 'icon-layers',
      children: [
        {
          name: 'Add new Release',
          url:'/Projects/DragDrop',
          icon: 'icon-clock',
        },
        {
          name: 'Releases Planning',
          url: '/Projects/AllReleases',
          icon: 'icon-layers',
        }]
    },
    {
      name: 'Issues',
      url: '/Projects/Issues',
      icon: 'icon-layers',
      children: [
        {
          name: 'Add issue',
          url:'/Projects/AddIssue',
          icon: 'icon-pencil',
        },
        {
          name: 'All Issues',
          url: '/Projects/AllIssues',
          icon: 'icon-layers',
        }]
    },
    {
      name: 'Statistics',
      url: '/Statistics',
      icon: 'icon-graph',
    },
   
  ],
};
