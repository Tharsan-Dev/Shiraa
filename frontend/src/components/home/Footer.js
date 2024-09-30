import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'

function Footer() {
  return (
    <div>      <footer id="Contact" className="bg-dark text-white py-4">
    <Container>
      <div className="row">
        <div className="col-md-3">
          <h5>About Shiraa</h5>
          <p>Connecting local shops with the community, one click at a time.</p>
        </div>
        <div className="col-md-3">
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            {['Home', 'Shops', 'Packages', 'About Us', 'Contact'].map((item) => (
              <li key={item}>
                <a href="#" className="text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-3">
          <h5>Connect With Us</h5>
          <div>
            {['Facebook', 'Twitter', 'Instagram'].map((social) => (
              <a key={social} href="#" className="text-white me-3">
                {social}
              </a>
            ))}
          </div>
        </div>
        <div className="col-md-3">
          <h5>Newsletter</h5>
          <Form>
            <div className="d-flex">
              <Form.Control type="email" placeholder="Your email" />
              <Button variant="primary" className="ms-2">
                Subscribe
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <div className="text-center mt-3">
        <p>&copy; 2023 Shiraa. All rights reserved.</p>
      </div>
    </Container>
  </footer></div>
  )
}

export default Footer