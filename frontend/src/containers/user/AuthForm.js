import "./Login.css";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import fetchUserInfo from "../../functions/userInfo";
import { Navigate, useNavigate } from "react-router-dom";

const AuthForm = ({ authEndpoint, fields, formName, shortText }) => {
  const loggedIn = (localStorage.getItem('loggedIn'));
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios.post(`/auth/${authEndpoint}/`, data)
      .then((response) => {
        if (response.status === 200) {
          fetchUserInfo();
          navigate(-1)
        }
      }).catch((error) => {
        console.log(error);
        console.log(error.response);
      })
  }
  const image = require('../../assets/img/driving-test.jpg');

  return (
    loggedIn ? <Navigate replace to="/" /> :
      <Container>
        <div className="d-lg-flex half">
          <div className="bg order-1 order-md-2" style={{ backgroundImage: "url(" + image + ")", backgroundSize: "cover" }}></div>
          <div className="contents order-2 order-md-1">
            <Container>
              <Row className="align-items-center justify-content-center">
                <Col md={9}>
                  <div className="mb-4">
                    <h3>{formName}</h3>
                    <p className="mb-1">{shortText}</p>
                  </div>
                  <Form action="#" method="post" onSubmit={handleSubmit((data) => onSubmit(data))}>
                    {fields.map((field, index) => (
                      <Form.Group className="mt-3" key={index}>
                        <Form.Label htmlFor={field.name}>{field.label}</Form.Label>
                        <Form.Control {...register(field.name, { required: field.required })} type={field.type} placeholder={field.placeholder} />
                        {errors[field.name] && <span className="text-danger">To pole jest wymagane</span>}
                      </Form.Group>
                    ))}
                    {authEndpoint === "register" &&
                      <Form.Group className="mb-3">
                        <Form.Check type="checkbox" required label="Zapoznałem się z regulaminem" />
                      </Form.Group>
                    }
                    {authEndpoint === "login" &&
                      <div className="d-flex mb-3 justify-content-end flex-row">
                        <span className="ml-auto"><a href="#" className="forgot-pass">Zapomniałeś hasła?</a></span>
                      </div>
                    }
                    <Button variant="primary" type="submit" className="w-100">{formName}</Button>
                  </Form>
                  <span className="d-block text-center my-4 text-muted">— lub —</span>
                  <div className="social-login">
                    <Button as="a" href="#" variant="link" className="facebook btn d-flex justify-content-center align-items-center">
                      {formName} przez: Facebook
                    </Button>
                    <Button as="a" href="#" variant="link" className="google btn d-flex justify-content-center align-items-center">
                      {formName} przez: Google
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </Container>
  );
}

export default AuthForm;