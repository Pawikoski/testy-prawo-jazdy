import { Navigate } from 'react-router-dom'
import buildSlug from '../../functions/buildSlug';
import { useEffect, useState } from 'react';
import axios from 'axios';

const fetchRandomQuestion = (setSlug) => {
  axios.get('/questions/?language=pl&random=true')
    .then(response => {
      const data = response.data;
      const q = data.results[0];
      setSlug(buildSlug(q.text, q.question_no));
    }).catch((error) => {
      console.log(error);
    });
}


const RandomQuestion = () => {
  const [slug, setSlug] = useState('');
  useEffect(() => {
    fetchRandomQuestion(setSlug);
  }, []);

  return (
    <Navigate replace to={slug} />
  )
}

export default RandomQuestion;