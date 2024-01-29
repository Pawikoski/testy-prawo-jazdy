import { useState } from "react";
import { Alert, Button, Col, Container, FloatingLabel, Form, Row, Spinner } from "react-bootstrap";

const Contact = () => {
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    setSending(true);
    const data = JSON.stringify({
      "name": e.target.name.value,
      "email": e.target.email.value,
      "subject": e.target.subject.value,
      "message": e.target.message.value,
    });
    const requestOptions = {
      "method": 'POST',
      "headers": {'Content-Type':'application/json'},
      "body": data,
    };

    fetch('http://localhost:8000/api/contact/', requestOptions)
      .then(response => {
        if (response.ok) {
          setSuccess(true);
          e.target.reset();
        } else {
          setError(true);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError(true);
      })
      .finally(() => {
        setSending(false);
      });
  }

  return (
    <Container>
      <Row className="align-items-center g-lg-5 py-5">
        <Col lg={7} className="text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 mb-3">Skontaktuj się z nami</h1>
          <p className="col-lg-10 fs-4">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
        </Col>
        <Col md={10} lg={5} className="mx-auto">
          <Form className="p-4 p-md-5 border rounded-3 bg-light" onSubmit={(e) => handleSubmit(e)}>
            <FloatingLabel className="mb-3" controlId="name" label="Twoje Imię">
              <Form.Control required type="text" maxLength={255} id="name" placeholder="Jan" />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="email" label="Twój adres e-mail">
              <Form.Control required type="email" maxLength={150} id="email" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="subject" label="Temat">
              <Form.Control required type="text" maxLength={255} id="subject" placeholder="Temat rozmowy" />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="message" label="Wiadomość">
              <Form.Control required as="textarea" style={{ height: '120px' }} id="message" placeholder="Tutaj wpisz treść wiadomości" />
            </FloatingLabel>
            {
              sending ?
                <Button disabled variant="primary" className="w-100" type="submit">
                  <Spinner as="span" size="sm" role="status" aria-hidden="true" />{' '}Wysyłanie
                </Button> :
                <Button variant="primary" className="w-100" type="submit">Wyślij wiadomość</Button>
            }
          </Form>
        </Col>
      </Row>
      <Alert variant="success" className="text-center position-absolute end-0 bottom-0 mb-5 me-5" show={success} dismissible onClose={() => setSuccess(false)}>
        <Alert.Heading>Wiadomość została wysłana</Alert.Heading>
        <p>Odpowiemy na Twoją wiadomość tak szybko, jak to możliwe.</p>
        <hr />
        <div className="d-flex justify-content-end">
        </div>
      </Alert>
      <Alert variant="danger" className="text-center position-absolute end-0 bottom-0 mb-5 me-5" show={error} dismissible onClose={() => setError(false)}>
        <Alert.Heading>Błąd</Alert.Heading>
        <p>Podczas wysyłania wystąpił błąd. Spróbuj ponownie później.</p>
        <hr />
        <div className="d-flex justify-content-end">
        </div>
      </Alert>
    </Container>
  );
}

export default Contact;