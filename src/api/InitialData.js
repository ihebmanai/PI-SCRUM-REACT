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
    0: {
      _id: "0",
      EtatName: "To Do",
      UserStories: ["6", "7", "8", "9", "10"]
    },
    1: {
      _id: "1",
      EtatName: "In Progress",
      UserStories: []
    },
    2: {
      _id: "2",
      EtatName: "Test",
      UserStories: []
    },
    3: {
      _id: "3",
      EtatName: "Done",
      UserStories: []
    }
  },
  columnOrder: ["0", "1", "2", "3"]
};
export default initialdata;
