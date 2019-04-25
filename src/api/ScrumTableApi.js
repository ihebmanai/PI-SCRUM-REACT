import axios from "axios";
//import { CONFIG } from "./config";

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
