import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faHandshakeSimple, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import axios from "axios";


const Icon = ({ icon }) => {
  return (
    <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
      <FontAwesomeIcon icon={icon} size="xl" />
    </div>
  )
}

const CategoryLandingPage = () => {
  let { category } = useParams();
  category = category.split('-')[1].toUpperCase();

  const [questionsCount, setQuestionsCount] = useState(null);
  const [dynamicCounter, setDynamicCounter] = useState(0);

  useEffect(() => {
    axios.get('/question-count', { params: { categories: category } })
      .then(response => setQuestionsCount(response.data.count))
      .catch(error => console.log(error));
  }, [category]);

  useEffect(() => {
    if (questionsCount === null) {
      const interval = setInterval(() => {
        setDynamicCounter(prevCounter => prevCounter + 1);
      }, 1);
      return () => clearInterval(interval);
    } else {
      setDynamicCounter(questionsCount);
    }
  }, [questionsCount]);

  return (
    <Container>
      <h2 className="pb-2 border-bottom">Kategoria {category}</h2>
      <p>Pozwala na kierowanie ogromnej liczby pojazdów, to znaczy samochodu o masie do 3500 kg, samochodu z przyczepą, pojazdu z kategorii AM, ciągnika rolniczego, walca wolnobieżnego (np. walca drogowego) oraz do dodania do każdego z w/w pojazdu lekkiej przyczepy (o masie do 750 kg). Warto wiedzieć, że jeśli posiadamy prawo jazdy kategorii B od co najmniej 3 lat, możemy także prowadzić motocykl o pojemności skokowej silnika do 125 cm3. Minimalny wiek na takie prawo jazdy to 18 lat.</p>
      <Row className="g-4 py-5 row-cols-1" lg={{ cols: 3 }}>
        <Col className="d-flex align-items-start">
          <Icon icon={faDatabase} />
          <div>
            <h2><span style={{width: "4ch", display: "inline-block"}}>{dynamicCounter}</span> Pytań i odpowiedzi</h2>
            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
            <Button variant="primary">Przejdź do pytań kat. {category}</Button>
          </div>
        </Col>
        <Col className="d-flex align-items-start">
          <Icon icon={faIdCard} />
          <div>
            <h2>Tylko oficjalne pytania</h2>
            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
            <Button variant="primary">lorem ipsum</Button>
          </div>
        </Col>
        <Col className="d-flex align-items-start">
          <Icon icon={faHandshakeSimple} />
          <div>
            <h2>Całkowicie bezpłatnie</h2>
            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
            <Button variant="primary">lorem ipsum</Button>
          </div>
        </Col>
      </Row>
      <Row>
        <h3>TOP 5 pytań dla kategorii {category}, na które najcześciej pada zła odpowiedź</h3>
        <ol>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</li>
        </ol>
      </Row>
    </Container>
  );
}

export default CategoryLandingPage;