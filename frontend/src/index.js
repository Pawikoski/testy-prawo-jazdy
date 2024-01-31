import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AllCategories from './containers/allCategories/AllCategories';
import App from './App';
import Article from './containers/blog/Article';
import axios from 'axios';
import BlogHome from './containers/blog/BlogHome';
import CategoryLandingPage from './containers/categoryLandingPage/CategoryLandingPage';
import Contact from './containers/contact/Contact';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Faq from './containers/faq/Faq';
import Home from './containers/home/Home';
import NotFound from './containers/NotFound';
import Login from './containers/user/Login';
import Logout from './containers/user/Logout';
import QuestionStorage from './containers/questionStorage/QuestionStorage';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import RandomQuestion from './containers/randomQuestion/RandomQuestion';
import Register from './containers/user/Register';
import SingleQuestion from './containers/singleQuestion/SingleQuestion';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


const questionLoader = (props) => {
  const question_no = props.params.slug.split(',')[1];
  return axios.get('/questions/' + question_no + '/?language=pl').then(response => response.json());
}

const router = createBrowserRouter([
  {
    path: '/', element: <App />, children: [
      { path: '', element: <Home /> },
      { path: 'logowanie', element: <Login /> },
      { path: 'rejestracja', element: <Register /> },
      { path: 'wyloguj', element: <Logout /> },
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
        element: <BlogHome />
      },
      {
        path: ':blog-category/:slug',
        element: <Article />
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
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
