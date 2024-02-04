import './SingleQuestion.css';
import { useLoaderData } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import CommentSection from '../../components/comments/CommentSection';
import { useRef, useState } from 'react';


const SingleQuestion = (slug) => {
  const question = useLoaderData();
  const selectedCategories = JSON.parse(localStorage.getItem('selectedCategories'));
  const [answered, setAnswered] = useState(false);
  const correct_answer = question.correct_answer.toLowerCase();
  const answers = {
    "a": useRef(null),
    "b": useRef(null),
    "c": useRef(null),
    "nie": useRef(null),
    "tak": useRef(null)
  }

  const handleAnswer = (e, answer) => {
    if (answered) return;
    if (answer === correct_answer) {
      e.target.classList.add('btn-success');
    } else {
      e.target.classList.add('btn-danger');
      answers[correct_answer].current.classList.add('btn-success');
    }
    setAnswered(true);
  }

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Prawo Jazdy</Breadcrumb.Item>
        <Breadcrumb.Item href="/baza-pytan">Pytania i odpowiedzi</Breadcrumb.Item>
        <Breadcrumb.Item active>{question.text}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="d-flex question-wrapper">
        <Image title={question.media} className="media" src="https://placehold.co/600x400" fluid />
        <div className="ms-2 py-2 me-auto d-flex flex-column justify-content-between">
          <h3 className='mb-3'>{question.text}</h3>
          {
            question.answer_a ?
              (
                <div className="d-flex flex-column text-left">
                  <Button onClick={(e) => handleAnswer(e, "a")} ref={answers.a} className="my-1 answer">A. {question.answer_a}</Button>
                  <Button onClick={(e) => handleAnswer(e, "b")} ref={answers.b} className="my-1 answer">B. {question.answer_b}</Button>
                  <Button onClick={(e) => handleAnswer(e, "c")} ref={answers.c} className="my-1 answer">C. {question.answer_c}</Button>
                </div>
              ) :
              (
                <div className="d-flex flex-xl-row flex-column justify-content-between">
                  <Button onClick={(e) => handleAnswer(e, "tak")} ref={answers.tak} className="w-100 mb-1 mb-xl-0 w-xl-50 me-xl-1">TAK</Button>
                  <Button onClick={(e) => handleAnswer(e, "nie")} ref={answers.nie} className="w-100 mt-1 mt-xl-0 w-xl-50 ms-xl-1">NIE</Button>
                </div>
              )
          }
        </div>
      </div>
      <hr />
      <div className="d-flex flex-row w-100 mt-3 justify-content-between">
        <Button>Poprzednie pytanie</Button>
        <Button variant="success">Wybrana kategoria: {selectedCategories != "" ? selectedCategories : "Wszystkie"}</Button>
        <Button>Następne pytanie</Button>
      </div>
      <hr className='my-5' />
      <CommentSection questionId={question.id} />
    </Container>
  );
}

export default SingleQuestion;