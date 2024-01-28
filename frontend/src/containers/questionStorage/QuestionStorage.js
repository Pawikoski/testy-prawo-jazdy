import "./questionStorage.css";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { Pagination, Stack } from "@mui/material";
import Badge from "react-bootstrap/Badge";
import CategoryFilter from "../../components/filters/categoryFilter";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Breadcrumb from "react-bootstrap/Breadcrumb";


const buildSlug = (question, question_no) => {
  question = question.split(' ').slice(0, 10).join(' ');
  const slug = slugify(question, { lower: true, strict: true });
  return "/pytanie/" + slug + ',' + question_no;
}

const QuestionStorage = () => {
  const selectedStorageCategories = JSON.parse(localStorage.getItem('selectedCategories'));
  const [selectedCategories, setSelectedCategories] = useState(selectedStorageCategories);
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    setQuestions([])
    const params = new URLSearchParams({
      page: page,
      language: 'pl'
    });
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories))
    if (selectedCategories.length > 0) {
      params.append('categories', selectedCategories.join(','));
    }
    const url = params ? "http://localhost:8000/api/questions/?" + params : "http://localhost:8000/api/questions/";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setQuestions(data.results);
        setPages(Math.ceil(data.count / 100))
      }).catch((error) => {
        console.log(error);
      });
  }, [selectedCategories, page]);

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Prawo Jazdy</Breadcrumb.Item>
        <Breadcrumb.Item active>Pytania</Breadcrumb.Item>
      </Breadcrumb>
      <h3>Baza pytań</h3>
      <div className="filters">
        <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
      </div>
      <ListGroup as="ul">
        {questions.map((question, idx) => (
          <ListGroup.Item key={idx} as="li" className="d-flex justify-content-between align-items-start py-3" action>
            <div className="ms-2 me-auto">
                <a className="text-black fw-bold text-decoration-none" href={buildSlug(question.text, question.question_no)}>{question.text}</a>
            {
                question.answer_a &&
                <div className="d-flex flex-row justify-content-start flex-wrap">
                  <div className="me-2"><Badge bg="secondary" pill>A. {question.answer_a}</Badge></div>
                  <div className="me-2"><Badge bg="secondary" pill>B. {question.answer_b}</Badge></div>
                  <div className="me-2"><Badge bg="secondary" pill>C. {question.answer_c}</Badge></div>
                </div>
              }
            </div>
            <Badge bg="primary" pill>
              {question.correct_answer}
            </Badge>
          </ListGroup.Item>
        ))
        }
      </ListGroup>
      <div className="d-flex justify-content-center">
        <Stack spacing={2} mt="2rem">
          <Pagination onChange={(e, v) => setPage(v)} count={pages} color="primary" />
        </Stack>
      </div>
    </Container>
  );
}

export default QuestionStorage;