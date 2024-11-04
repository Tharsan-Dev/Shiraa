import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'

function Footer() {
  return (
    <div style={{ backgroundColor: "#082f49" }}>
      <footer id="Contact" className=" text-white py-4" >
        <Container>
          <div className="row">
            <div className="col-md-3">
              <h5 className='fw-bold' style={{color:"#01e281"}}>About Shiraa</h5>
              <p className="text-black">Connecting local shops with the community, one click at a time.</p>
              </div>
            <div className="col-md-3">
              <h5 className='fw=bold'style={{color:"#01e281"}}>Quick Links</h5>
              <ul className="list-unstyled ">
                {[
                  { label: 'Home', href: '#home' },
                  { label: 'Shops', href: '#Shops' },
                  { label: 'Products', href: '#Products' },
                  { label: 'About Us', href: '#About-Us' },
                  
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-white text-decoration-none">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-3">
              <h5 className= 'fw-bold' style={{color:"#01e281"}}>Connect With Us</h5>
              <div>
                {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                  <a key={social} href="#" className="text-white me-3 text-decoration-none">
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
                  {/* <Button variant="primary" className="ms-2">
                Subscribe
              </Button> */}
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