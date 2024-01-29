import { Navigate } from 'react-router-dom'
import buildSlug from '../../functions/buildSlug';
import { useEffect, useState } from 'react';

const fetchRandomQuestion = (setSlug) => {
  fetch('http://localhost:8000/api/questions/?language=pl&random=true')
  .then(response => response.json())
  .then(data => {
    const q = data.results[0];
    setSlug(buildSlug(q.text, q.question_no));
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