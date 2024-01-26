import "./questionStorage.css";
import { useEffect, useState } from "react";
import { List, ListItem, Typography, Pagination, Stack, Link } from "@mui/material";
import CategoryFilter from "../../components/filters/categoryFilter";
import slugify from "slugify";


const buildSlug = (question, question_no) => {
  question = question.split(' ').slice(0, 10).join(' ');
  const slug = slugify(question, { lower: true, strict: true });
  return "/pytanie/" + slug + ',' + question_no;
}


const QuestionStorage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    setQuestions([])
    const params = new URLSearchParams({
      page: page,
      language: 'pl'
    });
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
    <div>
      <Typography component="h1" variant="h3" sx={{ textAlign: "center", my: 4 }}>Baza pytań</Typography>
      <div className="filters">
        <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
      </div>
      <List sx={{ my: "2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", }} >
        {questions.map((question, idx) => (
          <ListItem key={idx} sx={{ padding: "1.3rem", mb: "0.5rem", border: "blue 1px solid", width: "90%", borderRadius: 10 }}>
            <Typography fontWeight={500} component="p" variant="p"><Link href={buildSlug(question.text, question.question_no)}>{question.text}</Link></Typography>
          </ListItem>
        ))
        }
        <Stack spacing={2} mt="2rem">
          <Pagination onChange={(e, v) => setPage(v)} count={pages} color="primary" />
        </Stack>
      </List>
    </div>
  );
}

export default QuestionStorage;