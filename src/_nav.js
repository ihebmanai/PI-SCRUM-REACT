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
    {
      name: "Scrum Table",
      url: "/scrumTable",
      icon: "icon-drop"
    },
    {
      name: "Interview",
      url: "/interview",
      icon: "icon-pencil"
    },

    {
      name: "Behavior Evaluation",
      url: "/rating",
      icon: "icon-puzzle"
    },
    {
      name: " KPI Evaluation",
      url: "/kpi-evaluation",
      icon: "icon-cursor"
    },
    {
			name: 'votes',
			url: '/votes',
			icon: 'icon-speedometer'
		},
		{
			name: 'cv',
			url: '/cv',
			icon: 'icon-speedometer'
		},
		{
			name: 'add Formation',
			url: '/addformation',
			icon: 'icon-speedometer'
		},
		{
			name: 'Wish List',
			url: '/wishlist',
			icon: 'icon-speedometer'
		},

		{
			name: 'Vote for tasks',
			url: '/vote',
			icon: 'icon-speedometer'
		},
		{
			name: 'Backlog Sprint ',
			url: '/backlogdisplay',
			icon: 'icon-speedometer'
		},

		{
			name: 'Chart',
			url: '/chart',
			icon: 'icon-speedometer'
		},
		{
			name: 'Add Backlog Sprint',
			url: '/addstory',
			icon: 'icon-speedometer'
    },
    {
      title: true,
      name: 'meeting',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Meetings',
      url: '/meeting',
      icon: 'icon-cursor',
      children: [
        {
          name: 'List Meetings',
          url: '/meeting',
          icon: 'icon-cursor',
        },
        {
          name: 'add Meetings',
          url: '/createMeeting',
          icon: 'icon-cursor',
        },
       
        
       
      ],
    },
    {
      title: true,
      name: 'Evaluation & exams',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Exams',
      url: '/exams',
      icon: 'icon-pie-chart',
      children: [
        {
          name: 'List Examens',
          url: '/exams',
          icon: 'icon-cursor',
        },
        {
          name: 'add Exams',
          url: '/createexam',
          icon: 'icon-cursor',
        },
        
       
      ],
      
    },
    {
      name: 'Exaluations',
      url: '/evaluation',
      icon: 'icon-pie-chart',
      children: [
        {
          name: 'List Evaluations',
          url: '/evaluation',
          icon: 'icon-cursor',
        },
       
      ],
      
    }
    
   
  ],
};
