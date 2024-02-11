import { Row, Col } from "react-bootstrap";
import SingleComment from "./SingleComment";
import { useFetchQuestionComments } from "../api/fetchData";
import { Pagination, Stack } from "@mui/material";
import { useState } from "react";
import NeedLogin from "../modals/NeedLogin";

const CommentList = ({ source, objectId, refresh, setRefresh }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showNeedLogin, setShowNeedLogin] = useState(false);
  const comments = useFetchQuestionComments(`/question-comments/?qid=${objectId}`, currentPage, refresh);

  return (
    <>
      <NeedLogin show={showNeedLogin} setShow={setShowNeedLogin} />
      {comments && comments.results.map((comment) => (
        <Row key={comment.id}>
          <SingleComment commentId={comment.id} comment={comment} setRefresh={setRefresh} commentType={"comment"} showModal={setShowNeedLogin} />
          <section className="answers">
            {comment.answers && comment.answers.map((answer, idx) => (
              <SingleComment commentId={comment.id} key={`${comment.id}-${idx}`} comment={answer} setRefresh={setRefresh} refresh={refresh} commentType={"answer"} showModal={setShowNeedLogin} />
            ))}
          </section>
        </Row>
      ))}
      <Row>
        <Col className="d-flex justify-content-center">
          <Stack spacing={2} mt="2rem">
            {comments && <Pagination onChange={(_, v) => setCurrentPage(v)} count={Math.ceil(comments.count / 10)} page={currentPage} color="primary" />}
          </Stack>
        </Col>
      </Row>
    </>
  );
}

export default CommentList
