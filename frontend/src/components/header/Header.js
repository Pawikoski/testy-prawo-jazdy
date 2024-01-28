import './Header.css';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';

const pages = [
  { 'name': 'Baza pytań', 'href': '/baza-pytan' },
  {
    name: 'Kategorie', children: [
      { name: 'Wszystkie Kategorie', href: '/prawo-jazdy/wszystkie-kategorie' },
      { name: 'Kategoria A', href: '/prawo-jazdy/kategoria-a' },
      { name: 'Kategoria AM', href: '/prawo-jazdy/kategoria-am' },
      { name: 'Kategoria A1', href: '/prawo-jazdy/kategoria-a1' },
      { name: 'Kategoria A2', href: '/prawo-jazdy/kategoria-a2' },
      { name: 'Kategoria B', href: '/prawo-jazdy/kategoria-b' },
      { name: 'Kategoria B+E', href: '/prawo-jazdy/kategoria-be' },
      { name: 'Kategoria B1', href: '/prawo-jazdy/kategoria-b1' },
      { name: 'Kategoria C', href: '/prawo-jazdy/kategoria-c' },
      { name: 'Kategoria C+E', href: '/prawo-jazdy/kategoria-ce' },
      { name: 'Kategoria C1', href: '/prawo-jazdy/kategoria-c1' },
      { name: 'Kategoria D', href: '/prawo-jazdy/kategoria-d' },
      { name: 'Kategoria D+E', href: '/prawo-jazdy/kategoria-de' },
      { name: 'Kategoria D1', href: '/prawo-jazdy/kategoria-d1' },
      { name: 'Kategoria T', href: '/prawo-jazdy/kategoria-t' },
      { name: 'Kategoria PT', href: '/prawo-jazdy/kategoria-pt' }
    ]
  },
  { 'name': 'Losuj pytanie', 'href': '/losuj-pytanie' },
  { 'name': 'Blog', 'href': '/blog' },
  { 'name': 'FAQ', 'href': '/faq' },
  { 'name': 'Kontakt', 'href': '/kontakt' }
];

const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary justify-content-between mb-5">
      <Container><div><Navbar.Brand href="/">Prawo Jazdy</Navbar.Brand></div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='navbar-elements'>
          <Nav className="me-auto">
            {
              pages.map(
                (page) => (
                  page.children ?
                    <NavDropdown style={{ border: "1px" }} title="Kategorie" id="basic-nav-dropdown">
                      {
                        page.children.map((child) => (
                          <NavDropdown.Item href={child.href}>{child.name}</NavDropdown.Item>
                        ))
                      }
                    </NavDropdown>
                    :
                    <Nav.Link title={page.name} href={page.href}>{page.name}</Nav.Link>
                ))
            }
          </Nav>
          <ButtonGroup className='mobile-buttons'>
            <Button variant="success" as='a' href='/logowanie'>Zaloguj</Button>
            <Button variant="primary" as='a' href='/rejestracja'>Zarejestruj</Button>
          </ButtonGroup>
        </Navbar.Collapse>
        <ButtonGroup className='desktop-buttons'>
          <Button variant="success" as='a' href='/logowanie'>Zaloguj</Button>
          <Button variant="primary" as='a' href='/rejestracja'>Zarejestruj</Button>
        </ButtonGroup>
      </Container>
    </Navbar>
  );
}
export default Header;
