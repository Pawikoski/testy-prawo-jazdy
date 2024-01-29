import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

const SearchWidget = () => {
  return (
    <Card className="mb-4">
      <Card.Header>Szukaj</Card.Header>
      <Card.Body>
        <InputGroup>
          <Form.Control type="text" placeholder="Wyszukaj..." aria-label="Wyszukaj..." aria-describedby="button-search" />
          <Button variant="primary" id="button-search">[lupa]</Button>
        </InputGroup>
      </Card.Body>
    </Card>
  )
}

const CategoriesWidget = () => {
  return (
    <Card className="mb-4">
    <Card.Header>Kategorie</Card.Header>
    <Card.Body>
      <Row>
        <Col sm={6}>
          <ul className="list-unstyled mb-0">
            <li><a href="#!">Web Design (53)</a></li>
            <li><a href="#!">HTML (31)</a></li>
            <li><a href="#!">Freebies</a></li>
          </ul>
        </Col>
        <Col sm={6}>
          <ul className="list-unstyled mb-0">
            <li><a href="#!">JavaScript</a></li>
            <li><a href="#!">CSS</a></li>
            <li><a href="#!">Tutorials</a></li>
          </ul>
        </Col>
      </Row>
    </Card.Body>
  </Card>
  )
}

const PopularPosts = () => {
  return (
    <Card className="mb-4">
      <Card.Header>Popularne wpisy</Card.Header>
      <Card.Body>
          <ol>
            <li><a href="#!">wpis 1</a></li>
            <li><a href="#!">wpis 2</a></li>
            <li><a href="#!">wpis 3</a></li>
            <li><a href="#!">wpis 4</a></li>
            <li><a href="#!">wpis 5</a></li>
          </ol>
      </Card.Body>
    </Card>
  )
}


const Sidebar = () => {
  return (
    <Col lg={4}>
      <SearchWidget />
      <PopularPosts />
      <CategoriesWidget />
    </Col>
  );
}

export default Sidebar;
