import "./questionStorage.css";
import CategoryFilter from "../../components/filters/categoryFilter";
import { Container, Breadcrumb } from "react-bootstrap";
import LoadingList from "./LoadingList";
import QuestionList from "./QuestionList";
import QuestionSearchBar from "../../components/filters/QuestionSearchBar";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "react-router-dom";


const QuestionStorage = () => {
  const selectedStorageCategories = JSON.parse(localStorage.getItem('selectedCategories')) ? JSON.parse(localStorage.getItem('selectedCategories')) : [];
  const [selectedCategories, setSelectedCategories] = useState(selectedStorageCategories);

  const [searchParams] = useSearchParams();
  const [searchPhraseTemp, setSearchPhraseTemp] = useState(searchParams.get('q') ? searchParams.get('q') : null);
  const [searchPhrase, setSearchPhrase] = useState(searchParams.get('q') ? searchParams.get('q') : null);
  const [questionsCount, setQuestionsCount] = useState(0);
  window.addEventListener('storage', () => {
    const questionsCount = localStorage.getItem('questionsCount');
    if (questionsCount) setQuestionsCount(questionsCount);
  });

  const handleSelectedCategoriesChange = (value) => {
    setSelectedCategories(value);
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => setSearchPhrase(searchPhraseTemp), 500);
    return () => clearTimeout(timeOutId);
  }, [searchPhraseTemp]);

  useEffect(() => {
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories))
  }, [selectedCategories]);

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Prawo Jazdy</Breadcrumb.Item>
        <Breadcrumb.Item active>Pytania i odpowiedzi{selectedCategories && selectedCategories.length !== 0 && " (kat. " + selectedCategories.join(", ") + ")"}</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="mb-0">Baza pytań z odpowiedziami</h3>
      <small className="text-muted">{questionsCount} pytań</small>
      <div className="filters">
        <QuestionSearchBar searchPhrase={searchPhraseTemp} setSearchPhrase={setSearchPhraseTemp} />
        <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={handleSelectedCategoriesChange} />
      </div>
      <Suspense fallback={<LoadingList />}>
        <QuestionList categories={selectedCategories} searchPhrase={searchPhrase} />
      </Suspense>
    </Container>
  );
}

export default QuestionStorage;
