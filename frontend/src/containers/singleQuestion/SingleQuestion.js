import './SingleQuestion.css';
import { useLoaderData } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";


const SingleQuestion = (slug) => {
  const question = useLoaderData();
  const selectedCategories = JSON.parse(localStorage.getItem('selectedCategories'));

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Prawo Jazdy</Breadcrumb.Item>
        <Breadcrumb.Item href="/baza-pytan">Pytania</Breadcrumb.Item>
        <Breadcrumb.Item active>{question.text}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="d-flex question-wrapper">
        <Image title={question.media} className="media" src="https://placehold.co/600x400" fluid />
        <div className="ms-2 py-2 me-auto d-flex flex-column justify-content-between">
          <h3>{question.text}</h3>
          {
            question.answer_a ?
              (
                <div className="d-flex flex-column">
                  <Button className="my-1">{question.answer_a}</Button>
                  <Button className="my-1">{question.answer_b}</Button>
                  <Button className="my-1">{question.answer_c}</Button>
                </div>
              ) :
              (
                <div className="d-flex flex-row justify-content-between">
                  <Button className="w-50">TAK</Button>
                  <Button className="w-50">NIE</Button>
                </div>
              )
          }
        </div>
      </div>
      <hr />
      <div className="d-flex flex-row w-100 mt-3 justify-content-between">
        <Button>Poprzednie pytanie</Button>
        <Button variant="success">Pytanie {question.id} / 5000</Button>
        <Button>Następne pytanie</Button>
      </div>
    </Container>
  );
}

export default SingleQuestion;