import { Button, Modal } from "react-bootstrap";

const NeedLogin = ({ show, setShow }) => {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Zaloguj się</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center">Musisz być zalogowany, aby wykonać tę akcję.</p>
        <div className="d-flex justify-content-center flex-row">
          <Button href="/logowanie" variant="primary" className="me-2">Zaloguj się</Button>
          <Button href="/rejestracja" variant="secondary">Zarejestruj się</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default NeedLogin;