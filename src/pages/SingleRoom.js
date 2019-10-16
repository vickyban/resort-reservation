import React from 'react';
import defaultBcg from '../images/room-1.jpeg';
import { Hero } from '../components/Hero';
import { Banner } from '../components/Banner';
import { Room } from '../components/Room';
import { Link } from 'react-router-dom';
import { RoomContext } from '../context';
import { StyledHero } from '../components/StyledHero';

export class SingleRoom extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      slug: this.props.match.params.type,
      defaultBcg: defaultBcg,
    }
  }

  static contextType = RoomContext;

  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);
    if (!room) {
      return <div className="error">
        <h3>no such room could be found</h3>
        <Link to="/rooms" className="btn-primary">back to rooms</Link>
      </div>
    }

    const { name, description, capacity, size, price, extras, breakfast, pets, images } = room;
    const [mainImg, ...defaultImgs] = images;
    return (
      <div>
        <StyledHero img={images[0] || this.state.defaultBcg}>
          <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary">back to rooms</Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {
              defaultImgs.map((img, index) => <img key={index} src={img} alt={name} />)
            }
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price : ${price}</h6>
              <h6>size : {size} SQFT</h6>
              <h6>max capacity : {capacity} {capacity == 1 ? 'person' : 'people'}</h6>
              <h6>pet : {pets ? 'pets allowed' : 'no pets allowed'}</h6>
              <h6>{breakfast && 'free breakfast'}</h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>extras</h6>
          <ul className="extras">
            {
              extras.map((item, index) => <li key={index}>{item}</li>)
            }
          </ul>
        </section>
      </div>
    );
  }
}