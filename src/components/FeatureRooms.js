import React from 'react';
import { RoomContext } from '../context';
import { Loading } from './Loading';
import { Room } from './Room';
import { Title } from './Title';

export class FeatureRooms extends React.Component {
  // required - for this.context to work
  static contextType = RoomContext;

  render() {
    let { featuredRooms, rooms, loading } = this.context;
    rooms = featuredRooms.map(room => (<Room key={room.id} room={room} />));
    return (
      <section className="feature-rooms">
        <Title title="Featured Rooms" />
        <div className="featured-rooms-center">
          {loading ? <Loading /> : rooms}
        </div>
        feature rooms
      </section>
    );

  }
}