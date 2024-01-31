import "./questionStorage.css";
import { useEffect, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import Badge from "react-bootstrap/Badge";
import CategoryFilter from "../../components/filters/categoryFilter";
import QuestionSearchBar from "../../components/filters/QuestionSearchBar";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useSearchParams } from "react-router-dom";
import buildSlug from "../../functions/buildSlug";
import axios from "axios";

const QuestionStorage = () => {
  const selectedStorageCategories = JSON.parse(localStorage.getItem('selectedCategories')) ? JSON.parse(localStorage.getItem('selectedCategories')) : [];
  const [selectedCategories, setSelectedCategories] = useState(selectedStorageCategories);
  const [questions, setQuestions] = useState([]);

  let [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (value) => {
    setPage(value);
    setSearchParams({ ...searchParams, page: value });
  };
  const handleSelectedCategoriesChange = (value) => {
    setSelectedCategories(value);
    handlePageChange(1)
  };

  const handleSearch = () => {
    setSearchParams({ ...searchParams, pytanie: searchPhrase })
    // TODO: fetch search results
  }

  const [searchPhrase, setSearchPhrase] = useState(searchParams.get('search') ? searchParams.get('search') : null);
  useEffect(() => {
    const timeOutId = setTimeout(() => handleSearch(), 500);
    return () => clearTimeout(timeOutId);
  }, [searchPhrase]);

  const [page, setPage] = useState(searchParams.get('page') ? parseInt(searchParams.get('page')) : 1);
  const [pages, setPages] = useState(0);


  useEffect(() => {
    setQuestions([])
    const params = new URLSearchParams({
      page: page,
      language: 'pl'
    });
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories))
    if (selectedCategories && selectedCategories.length > 0) {
      params.append('categories', selectedCategories.join(','));
    }
    const url = params ? "/questions/?" + params : "/questions/";
    axios.get(url)
      .then(response => {
        const data = response.data;
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
        <Breadcrumb.Item active>Pytania{selectedCategories && selectedCategories.length !== 0 && " (kat. " + selectedCategories.join(", ") + ")"}</Breadcrumb.Item>
      </Breadcrumb>
      <h3>Baza pytań</h3>
      <div className="filters">
        <QuestionSearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />
        <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={handleSelectedCategoriesChange} />
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
          <Pagination onChange={(_, v) => handlePageChange(v)} count={pages} page={page} color="primary" />
        </Stack>
      </div>
    </Container>
  );
}

export default QuestionStorage;