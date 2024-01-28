import "./Login.css";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const image = require('../../assets/img/driving-test.jpg');

  return (
    <Container>
      <div className="d-lg-flex half">
        <div className="bg order-1 order-md-2" style={{ backgroundImage: "url(" + image + ")", backgroundSize: "cover" }}></div>
        <div className="contents order-2 order-md-1">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-9">
                <div className="mb-4">
                  <h3>Zaloguj się</h3>
                  <p className="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</p>
                </div>
                <Form action="#" method="post" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label for="email">Adres e-mail</Form.Label>
                    <Form.Control type="email" placeholder="E-mail" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label for="password">Hasło</Form.Label>
                    <Form.Control type="password" placeholder="Hasło" />
                  </Form.Group>
                  <div className="d-flex mb-5 justify-content-between flex-row">
                    <Form.Check label="Zapamiętaj mnie" title="Zapamiętaj mnie" className="mb-0" />
                    <span className="ml-auto"><a href="#" className="forgot-pass">Forgot Password</a></span>
                  </div>
                  <Button variant="primary" type="submit" className="w-100">Zaloguj się</Button>
                  <span className="d-block text-center my-4 text-muted">— or —</span>
                  <div className="social-login">
                    <Button as="a" href="#" variant="link" className="facebook btn d-flex justify-content-center align-items-center">
                      Zaloguj przez: Facebook
                    </Button>
                    <Button as="a" href="#" variant="link" className="google btn d-flex justify-content-center align-items-center">
                      Zaloguj przez: Google
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}