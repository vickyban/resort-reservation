import React, { Component } from 'react';
import { Title } from './Title';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';

export class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: 'Free cocktails',
        info: "Here ai i don;t know what tod write"
      },
      {
        icon: <FaHiking />,
        title: 'Endless hiking',
        info: "Here ai i don;t know what tod write"
      },
      {
        icon: <FaShuttleVan />,
        title: 'Free shuttle',
        info: "Here ai i don;t know what tod write"
      },
      {
        icon: <FaBeer />,
        title: 'strongest beer',
        info: "Here ai i don;t know what tod write"
      },
    ]
  }
  render() {
    return (
      <section className="services">
        <Title title="services" />
        <div className="services-center">
          {
            this.state.services.map((item, index) => (
              <article key={index} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            ))
          }
        </div>
      </section>
    )
  }
}