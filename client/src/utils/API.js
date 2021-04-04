import axios from "axios";

export default {
  createAction: function(actionData) {
    return axios.post("/api/actions", actionData);
  },
  getAction: function(id) {
    return axios.get("/api/actions/" + id);
  },
  updateAction: function(id, actionData) {
    return axios.put("/api/actions/" + id, actionData);
  },
  deleteAction: function(id) {
    return axios.delete("/api/actions/" + id);
  },
  getActionsLastDay: function(childId) {
    return axios.get("/api/actions/lastday/" + childId);
  },
  getActionsLastDayByName: function (childId, name) {
    return axios.get("/api/actions/lastday/" + childId + "/" + name);
  },
  getActionsLastWeek: function(childId) {
    return axios.get("/api/actions/lastweek/" + childId);
  },
  getActionsLastWeekByName: function (childId, name) {
    return axios.get("/api/actions/lastweek/" + childId + "/" + name);
  },
  createUser: function (userData) {
    return axios.post("/api/users", userData);
  },
  getUser: function (id) {
    return axios.get("/api/users/" + id);
  },
  getUserByUid: function (id) {
    return axios.get("/api/users/auth/" + id);
  },
  updateUser: function (id, userData) {
    return axios.put("/api/users/" + id, userData);
  },
  deleteUser: function (id) {
    return axios.delete("/api/users/" + id);
  },
  createChild: function (childData) {
    return axios.post("/api/children/", childData);
  },
  getChild: function (id) {
    return axios.get("/api/children/" + id);
  },
  updateChild: function (id, childData) {
    return axios.put("/api/children/" + id, childData);
  },
  deleteChild: function (id) {
    return axios.delete("/api/children/" + id);
  }
};
