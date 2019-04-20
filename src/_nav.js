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
          name: 'Current Project',
          url: '/Projects/CurrentProject',
          icon: 'icon-clock',
        },
        {
          name: 'All Projects',
          url: '/Projects/ProjectList',
          icon: 'icon-grid',
        }]
    },
    {
      name: 'Backlog',
      url: '/Projects/BacklogProject',
      icon: 'icon-list',
    },
    {
      name: 'Releases',
      url: '/Projects/DragDrop',
      icon: 'icon-layers',
      children: [
        {
          name: 'Current Release',
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
      name: 'Statistics',
      url: '/Statistics',
      icon: 'icon-graph',
    },
   
  ],
};
