import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "./Sidebar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Stack, Pagination } from "@mui/material";
import { useState } from "react";

const BlogHome = () => {
  const [page, setPage] = useState(1);
  const pages = 5;

  return (
    <div>
      <Container>
        <Row>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Img variant="top" src="https://dummyimage.com/850x350/dee2e6/6c757d.jpg" />
              <Card.Body>
                <span className="small text-muted">January 1, 2023</span>
                <Card.Title as="h2">Featured Post Title</Card.Title>
                <Card.Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!</Card.Text>
                <Button variant="primary" href="/kategoria/artykul">Read more →</Button>
              </Card.Body>
            </Card>
            <Row>
              <Col lg={6}>
                <Card className="mb-4">
                  <Card.Img variant="top" src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg" />
                  <Card.Body>
                    <div className="small text-muted">January 1, 2023</div>
                    <Card.Title as="h4">Post Title</Card.Title>
                    <Card.Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.</Card.Text>
                    <Button href="#!">Read more →</Button>
                  </Card.Body>
                </Card>
                <Card className="mb-4">
                  <Card.Img variant="top" src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg" />
                  <Card.Body>
                    <div className="small text-muted">January 1, 2023</div>
                    <Card.Title as="h4">Post Title</Card.Title>
                    <Card.Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.</Card.Text>
                    <Button href="#!">Read more →</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Card className="mb-4">
                  <Card.Img variant="top" src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg" />
                  <Card.Body>
                    <div className="small text-muted">January 1, 2023</div>
                    <Card.Title as="h4">Post Title</Card.Title>
                    <Card.Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.</Card.Text>
                    <Button href="#!">Read more →</Button>
                  </Card.Body>
                </Card>
                <Card className="mb-4">
                  <Card.Img variant="top" src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg" />
                  <Card.Body>
                    <div className="small text-muted">January 1, 2023</div>
                    <Card.Title as="h4">Post Title</Card.Title>
                    <Card.Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.</Card.Text>
                    <Button href="#!">Read more →</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <nav aria-label="Pagination" className="d-flex justify-content-center">
              <Stack spacing={2} mt="2rem">
                <Pagination onChange={(e, v) => setPage(v)} count={pages} color="primary" />
              </Stack>
            </nav>
          </Col>
          <Sidebar />
        </Row>
      </Container>
    </div>
  );
}

export default BlogHome;