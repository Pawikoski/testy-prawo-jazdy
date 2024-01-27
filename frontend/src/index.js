import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import QuestionStorage from './containers/questionStorage/QuestionStorage';
import Login from './containers/user/Login';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SingleQuestion from './containers/singleQuestion/SingleQuestion';
import Contact from './containers/contact/Contact';
import NotFound from './containers/NotFound';
import Faq from './containers/faq/Faq';
import Blog from './containers/blog/Blog';
import RandomQuestion from './containers/randomQuestion/RandomQuestion';
import CategoryLandingPage from './containers/categoryLandingPage/CategoryLandingPage';
import AllCategories from './containers/allCategories/AllCategories';
import Register from './containers/user/Register';


const questionLoader = (props) => {
  const question_no = props.params.slug.split(',')[1];
  return fetch('http://localhost:8000/api/questions/' + question_no + '/?language=pl').then(response => response.json());
}


const router = createBrowserRouter([
  {
    path: '/', element: <App />, children: [
      { path: 'logowanie', element: <Login /> },
      { path: 'rejestracja', element: <Register /> },
      { path: 'baza-pytan', element: <QuestionStorage /> },
      {
        path: 'pytanie/:slug',
        element: <SingleQuestion />,
        loader: async (props) => questionLoader(props),
      },
      {
        path: 'kontakt',
        element: <Contact />
      },
      {
        path: 'faq',
        element: <Faq />
      },
      {
        path: 'losuj-pytanie',
        element: <RandomQuestion />
      },
      {
        path: 'blog',
        element: <Blog />
      },
      {
        path: 'prawo-jazdy/wszystkie-kategorie',
        element: <AllCategories />,
      },
      {
        path: 'prawo-jazdy/:category',
        element: <CategoryLandingPage />,
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
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
