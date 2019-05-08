const initialdata = {
  tasks: {
    6: {
      _id: "20",
      UserStoryName: "login",
      description: "dssdsfdsfdsf"
    },
    7: {
      _id: "18",
      UserStoryName: "register",
      description: "dssdsfdsfdsf"
    },
    8: {
      _id: "13",
      UserStoryName: "profil admin",
      description: "dssdsfdsfdsf"
    },
    9: {
      _id: "12",
      UserStoryName: "gestion profil",
      description: "dssdsfdsfdsf"
    },
    10: {
      _id: "15",
      UserStoryName: "gestion utilisateur",
      description: "dssdsfdsfdsf"
    }
  },
  columns: {
    "ToDo": {
      _id: "ToDo",
      EtatName: "To Do",
      UserStories: ["6", "7", "8", "9", "10"]
    },
    "InProgress": {
      _id: "InProgress",
      EtatName: "In Progress",
      UserStories: []
    },
    "Test": {
      _id: "Test",
      EtatName: "Test",
      UserStories: []
    },
    "Done": {
      _id: "Done",
      EtatName: "Done",
      UserStories: []
    }
  },
  columnOrder: ["ToDo", "InProgress", "Test","Done"]
};
export default initialdata;
