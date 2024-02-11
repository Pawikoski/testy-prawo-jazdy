import axios from "axios";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import fetchUserInfo from "../../functions/userInfo";
import { useState } from "react";

const AddComment = ({ source, objectId, refresh, setRefresh }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [userName, setUserName] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).first_name : null);
  window.addEventListener('storage', () => {
    setUserName(JSON.parse(localStorage.getItem('user')).first_name);
  });

  const onSubmit = (data) => {
    data.question = objectId;
    axios.post('/question-comments/', data).then((response) => {
      if (response.status === 201 && data.name) {
        fetchUserInfo();
      }
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      reset();
      setRefresh(refresh + 1);
    });
  }

  return (
    <Row>
      <hr className="my-2" />
      <Col md={10} className="mx-auto border rounded p-4 bg-white" id="add-comment">
        <h3>Dodaj komentarz</h3>
        <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
          {userName || !localStorage.getItem("loggedIn") ? null : (
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Twoje imię</Form.Label>
              <Form.Control {...register("name", { required: true })} type="text" placeholder="Paweł" />
            </Form.Group>
          )}
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Komentarz</Form.Label>
            <Form.Control {...register("text", { required: true })} as="textarea" rows={3} />
          </Form.Group>
          <div className="d-flex flex-row justify-content-end">
            <Button type="submit" className="ms-auto">Dodaj komentarz</Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default AddComment;