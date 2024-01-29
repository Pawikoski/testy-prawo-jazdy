import Container from "react-bootstrap/Container";
import React from "react";
import AddToAny from "../../components/social/AddToAny";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "./Sidebar";
import CommentSection from "../../components/comments/CommentSection";

const Article = () => {
  return (
    <Container>
      <Row>
        <Col lg={8}>
          <h1>Lorem ipsum</h1>
          <div className="d-flex justify-content-between">
            <p className="small text-muted">January 1, 2023</p>
            <p className="small text-muted">Autor: <a href="/blog?autor=jan-nowak">Jan Nowak</a></p>
          </div>
          <Row>
            <Image src="https://dummyimage.com/850x350/dee2e6/6c757d.jpg" />
          </Row>
          <article className="py-4">
            <h3>Lorem ipsum</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus qui voluptatum necessitatibus quo, quod voluptatem quisquam culpa earum eos ipsum eaque cumque ex recusandae et a doloribus. Error, nulla aut?</p>
            <h3>Lorem ipsum</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus qui voluptatum necessitatibus quo, quod voluptatem quisquam culpa earum eos ipsum eaque cumque ex recusandae et a doloribus. Error, nulla aut?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus qui voluptatum necessitatibus quo, quod voluptatem quisquam culpa earum eos ipsum eaque cumque ex recusandae et a doloribus. Error, nulla aut?</p>
          </article>
          <AddToAny className={"mb-5"} />
          <div className="d-flex flex-row justify-content-between w-100">
            <div>Poprzedni wpis <a href="/kategoria3/tytul-5">"tytuł artykułu"</a></div>
            <div>Następny wpis <a href="/kategoria3/tytul-5">"tytuł artykułu"</a></div>
          </div>
          <CommentSection />
        </Col>
        <Sidebar />
      </Row>
    </Container>
  );
}

export default Article;