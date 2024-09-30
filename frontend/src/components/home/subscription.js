import React from 'react';
import {Container, Card, Button } from 'react-bootstrap';


function Subscription() {
  return (
    <div><section id="Packages" className="py-5">
    <Container>
      <h2 className="text-center mb-4">Subscription Packages</h2>
      <div className="row">
        {['Basic', 'Pro', 'Premium'].map((pkg, index) => (
          <div key={pkg} className="col-md-4 mb-4">
            <Card className="text-center">
              {index === 1 && (
                <Card.Header className="bg-warning text-white">
                  Best Value
                </Card.Header>
              )}
              <Card.Body>
                <Card.Title>{pkg} Package</Card.Title>
                <ul className="list-unstyled">
                  <li>Feature 1</li>
                  <li>Feature 2</li>
                  <li>Feature 3</li>
                </ul>
                <h3>${(index + 1) * 9.99}/mo</h3>
                <Button variant="primary">Choose Package</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
    </section></div>
  )
}

export default Subscription




