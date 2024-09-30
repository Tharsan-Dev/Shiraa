import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

function ProductPage() {
  return (
    <div>
        <section className="py-5" id='Products'>
        <Container>
          <h3 className="text-center mb-5">Featured Products</h3>
          <Row>
            {[1, 2, 3, 4,5,6,7,8].map((item) => (
              <Col sm={6} lg={3} key={item} className="mb-4">
                <Card className="h-100">
                  <Card.Img variant="top" src={`/placeholder.svg?height=300&width=300&text=Product ${item}`} />
                  <Card.Body>
                    <Card.Title>Product Name</Card.Title>
                    <Card.Text>$99.99</Card.Text>
                    <Button variant="warning" className="w-100">Add to Cart</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default ProductPage;