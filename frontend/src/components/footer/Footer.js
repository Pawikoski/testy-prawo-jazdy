import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewsletterForm = () => {
  return (
    <div className="col-md-5 offset-md-1 mb-3">
      <Form>
        <h5>Zapisz się do naszego newslettera</h5>
        <p>Otrzymuj informacje o nowych pytaniach na egzaminie, artykułach związanych z prawem jazdy, zmianami w prawie.</p>
        <div className="d-flex flex-column flex-sm-row w-100 gap-2">
          <Form.Label for="newsletter1" className="visually-hidden">Adres e-mail</Form.Label>
          <Form.Control type="email" placeholder="Adres e-mail" />
          <Button variant="primary">Zasubskrybuj</Button>
        </div>
      </Form>
    </div>
  );
}

const Section = ({ title, links }) => {
  return (
    <div className="col-6 col-md-2 mb-3">
      <h5>{title}</h5>
      <ul className="nav flex-column">
        {
          links.map((link) => (
            <li className="nav-item mb-2"><a href={link.href} className="nav-link p-0 text-body-secondary">{link.name}</a></li>
          ))
        }
      </ul>
    </div>
  );
}

const Footer = () => {
  return (
    <Container>
      <footer className="py-5">
        <div className="row">
          <Section title="Prawo Jazdy" links={[{ name: 'O nas', href: '/o-nas' }, { name: 'Kontakt', href: '/kontakt' }, { name: 'Regulamin', href: '/regulamin' }, { name: 'Polityka prywatności', href: '/polityka-prywatnosci' }]} />
          <Section title="Prawo Jazdy" links={[{ name: 'O nas', href: '/o-nas' }, { name: 'Kontakt', href: '/kontakt' }, { name: 'Regulamin', href: '/regulamin' }, { name: 'Polityka prywatności', href: '/polityka-prywatnosci' }]} />
          <Section title="Prawo Jazdy" links={[{ name: 'O nas', href: '/o-nas' }, { name: 'Kontakt', href: '/kontakt' }, { name: 'Regulamin', href: '/regulamin' }, { name: 'Polityka prywatności', href: '/polityka-prywatnosci' }]} />
          <NewsletterForm />
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p>© 2024 Prawo Jazdy</p>
          <ul className="list-unstyled d-flex">
            {/* <li className="ms-3"><a className="link-body-emphasis" href="#"><svg className="bi" width="24" height="24"><use xlink:href="#twitter"></use></svg></a></li> */}
            {/* <li className="ms-3"><a className="link-body-emphasis" href="#"><svg className="bi" width="24" height="24"><use xlink:href="#instagram"></use></svg></a></li> */}
            {/* <li className="ms-3"><a className="link-body-emphasis" href="#"><svg className="bi" width="24" height="24"><use xlink:href="#facebook"></use></svg></a></li> */}
          </ul>
        </div>
      </footer>
    </Container>
  );
}

export default Footer;
// TODO: populate with real links, add social media links, handle newsletter form