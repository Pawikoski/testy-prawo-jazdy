import { ListGroup, Badge } from "react-bootstrap";
import buildSlug from "../../functions/buildSlug";
import useFetchQuestions from "../../components/api/fetchData";
import { Pagination, Stack } from "@mui/material";
import { useState } from "react";


const QuestionList = ({categories, searchPhrase}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const data = useFetchQuestions('/questions/', currentPage, categories, searchPhrase);

  return (
    <ListGroup as="ul">
      {data && data.results.map((question, idx) => (
        <ListGroup.Item key={idx} as="li" className="d-flex justify-content-between align-items-start py-3" action>
          <div className="ms-2 me-auto">
            <a className="text-black fw-bold text-decoration-none" href={buildSlug(question.text, question.question_no)}>{question.text}</a>
            {
              question.answer_a &&
              <div className="d-flex flex-row justify-content-start flex-wrap">
                <Badge className="me-2" bg="secondary" pill>A. {question.answer_a}</Badge>
                <Badge className="me-2" bg="secondary" pill>B. {question.answer_b}</Badge>
                <Badge className="me-2" bg="secondary" pill>C. {question.answer_c}</Badge>
              </div>
            }
          </div>
          <Badge bg="success" pill>
            {question.correct_answer}
          </Badge>
        </ListGroup.Item>
      ))
      }
      <div className="d-flex justify-content-center">
        <Stack spacing={2} mt="2rem">
          <Pagination onChange={(_, v) => setCurrentPage(v)} count={data && Math.ceil(data.count / 100)} page={currentPage} color="primary" />
        </Stack>
      </div>
    </ListGroup>
  );
}

export default QuestionList;

