
import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import './App.scss';
import DetailsMeeting from './components/meetingComponents/detailsMeetings';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});
const Meetings = Loadable({
  loader: () => import('./components/meetingComponents/meetings'),
  loading
});

const CreateMeeting = Loadable({
  loader: () => import('./components/meetingComponents/CreateMeeting'),
  loading
});

const listExams = Loadable({
  loader: () => import('./components/ExamComponents/list-Exams'),
  loading
});

const createExam = Loadable({
  loader: () => import('./components/ExamComponents/create-exam'),
  loading
});

const detailsExam = Loadable({
  loader: () => import('./components/ExamComponents/detailsExam'),
  loading
});
const updatemeeting = Loadable({
  loader: () => import('./components/meetingComponents/updateMeeting'),
  loading
});

const passerexams = Loadable({
  loader: () => import('./components/ExamComponents/passerExams'),
  loading
});

const inviteMeeting = Loadable({
  loader: () => import('./components/meetingComponents/inviteUsers'),
  loading
});

const call = Loadable({
  loader: () => import('./components/ChatComponents/CallModal'),
  loading
});

const inviteexam = Loadable({
  loader: () => import('./components/ExamComponents/inviteexam'),
  loading
});

const begin = Loadable({
  loader: () => import('./components/ExamComponents/begin'),
  loading
});

const finish = Loadable({
  loader: () => import('./components/ExamComponents/finish'),
  loading
});

const updateExam = Loadable({
  loader: () => import('./components/ExamComponents/update-exam'),
  loading
});

const Evaluation = Loadable({
  loader: () => import('./components/ExamComponents/evaluationTeck'),
  loading
});

const Ficheevluation = Loadable({
  loader: () => import('./components/ExamComponents/ficheevaluation'),
  loading
});
class App extends Component {

  render() {
    return (
      <HashRouter>
          <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
            
            <Route exact path="/meeting" name="Meeting Page" component={Meetings} />

            <Route exact path="/createMeeting" name="create Meeting" component={CreateMeeting} />
            <Route exact path="/detailsmeeting/:id" name="details Meeting" component={DetailsMeeting} />
            <Route exact path="/inviteMeeting/:id" name="invite Meeting" component={inviteMeeting} />
            <Route exact path="/call" name="call video" component={call} />
            <Route exact path="/updatemeeting/:id" name="update Meeting" component={updatemeeting} />
            

            

            <Route exact path="/exams" name="exams Page" component={listExams} />
            <Route exact path="/createexam" name="create exam" component={createExam} />
            <Route exact path="/detailsexam/:id" name="details exam" component={detailsExam} />
            <Route exact path="/passerExam" name="details exam" component={passerexams} />
            <Route exact path="/inviteExam/:id" name="invite exam" component={inviteexam} />
            <Route exact path="/updateExam/:id" name="update exam" component={updateExam} />
            <Route exact path="/begin" name="update Meeting" component={begin} />
            <Route exact path="/finish" name="finish exam" component={finish} />
            <Route exact path="/evaluation" name="evaluation" component={Evaluation} />
            <Route exact path="/fiche/evaluation/:id" name="fiche evaluatuib" component={Ficheevluation} />
            

            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/register" name="Register Page" component={Register} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
      </HashRouter>
    );
  }
}

export default App;
