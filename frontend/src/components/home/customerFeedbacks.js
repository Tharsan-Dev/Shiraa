import React, { useState } from 'react';
import {Container, Carousel } from 'react-bootstrap';
import { BsStar} from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';


function CustomerFeedbacks() {
    const[currentTestimonial,setCurrentTestimonial] = useState(0);


  const testimonials = [
    { name: 'T.Tharsan', photo: 'https://via.placeholder.com/80', review: 'Shiraa made shopping local so easy!', rating: 5 },
    { name: 'J.Jathushan', photo: 'https://via.placeholder.com/80', review: 'I love supporting my community through Shiraa.', rating: 5 },
    { name: 'M.Lakshiga', photo: 'https://via.placeholder.com/80', review: 'The variety of shops is amazing!', rating: 5 },
  ];


  return (
    <div style={{ backgroundColor: '#e2e8f0' }}>
        <section id="About-Us" className="py-5 " >
         
        <Container>
          <h2 className="text-center mb-4">What Our Customers Say</h2>
          <Carousel
            activeIndex={currentTestimonial}
            onSelect={(selectedIndex) => setCurrentTestimonial(selectedIndex)}
            className="mx-auto"
            style={{ maxWidth: '600px' }}
          >
            {testimonials.map((testimonial, index) => (
              <Carousel.Item key={index}>
                <div className="text-center">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="rounded-circle mb-3"
                    style={{ width: '80px', height: '80px' }}
                  />
                  <h5>{testimonial.name}</h5>
                  <p>"{testimonial.review}"</p>
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <BsStar
                        key={i}
                        className={`me-1 ${i < testimonial.rating ? 'text-warning' : 'text-muted'}`}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </section>
    </div>
  )
}

export default CustomerFeedbacks