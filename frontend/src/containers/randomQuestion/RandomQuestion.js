import { Navigate } from 'react-router-dom'
import buildSlug from '../../functions/buildSlug';
import { useEffect, useState } from 'react';
import axios from 'axios';

const fetchRandomQuestion = (setSlug) => {
  const params = {
    language: 'pl',
    random: true,
  }
  if (localStorage.getItem('selectedCategories')) {
    params.categories = JSON.parse(localStorage.getItem('selectedCategories')).join(',');
  }
  axios.get('/questions/', { params: params })
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