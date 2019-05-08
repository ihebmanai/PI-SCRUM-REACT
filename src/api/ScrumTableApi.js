import axios from "axios";
import { CONFIG } from "./config";

export const getUserStories = () => {
  const requestURL = `http://localhost:3000/userStory/list`;

  return axios.get(requestURL).then(
    res => {
      return res;
    },
    error => {
      throw new Error(error);
    }
  );
};
export const getColumns = () => {
  const requestURL = `http://localhost:3000/etat/list`;

  return axios.get(requestURL).then(
    res => {
      return res;
    },
    error => {
      throw new Error(error);
    }
  );
};
export const getSprints = () => {
  const requestURL = `http://localhost:3000/sprint/list`;

  return axios.get(requestURL).then(
    res => {
      return res;
    },
    error => {
      throw new Error(error);
    }
  );
};
export const getMemberBySprint = idSprint => {
  const requestURL = `http://localhost:3000/sprint/listDevMember/${idSprint}`;

  return axios.get(requestURL).then(
    res => {
      return res;
    },
    error => {
      throw new Error(error);
    }
  );
};
export const getMemberBySprintRate = idSprint1 => {
  const requestURL = `http://localhost:3000/rate/listDevMemberRate/${idSprint1}`;

  return axios.get(requestURL).then(
    res => {
      return res;
    },
    error => {
      throw new Error(error);
    }
  );
};
export const getMemberAbsence = (idUser,value) => {
  const requestURL = `http://localhost:3000/meetings/absenceByUser/${idUser}`;
console.log(value+"ggggg");

  return axios.post(requestURL,value).then(
    res => {
      return res;
    },
    error => {
      throw new Error(error);
    }
  );
};
export const getMemberWorkDone = (idUser) => {
  const requestURL = `http://localhost:3000/userStory/workDone/${idUser}`;


  return axios.post(requestURL).then(
    res => {
      return res;
    },
    error => {
      throw new Error(error);
    }
  );
};
export const editRating = value => {
  const requestURL = `http://localhost:3000/rate/update/${value._id}/${value.note}`;

  
  return axios.get(requestURL).then(


    res => {  
     
      return res;
    },
    error => {
      throw new Error(error);
    }
  );
};
export const editEtat = (value,callback) => {
  const requestURL = `http://localhost:3000/userStory/updateEtat`;

  
  return axios.put(requestURL,value).then(


    res => { 
     
      return res;
    },
    error => {
      throw new Error(error);
    }
  );
};