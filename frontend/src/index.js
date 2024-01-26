import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import QuestionStorage from './containers/questionStorage/QuestionStorage';
import Login from './containers/user/Login';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SingleQuestion from './containers/singleQuestion/SingleQuestion';


const questionLoader = (props) => {
  const question_no = props.params.slug.split(',')[1];
  return fetch('http://localhost:8000/api/questions/' + question_no + '/?language=pl').then(response => response.json());
}


const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { path: 'zaloguj', element: <Login /> },
    { path: 'baza-pytan', element: <QuestionStorage />},
    { 
      path: 'pytanie/:slug',
      element: <SingleQuestion />,
      loader: async (props) => questionLoader(props),
    },
  ]},
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
