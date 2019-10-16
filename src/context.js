import React, { Component, createContext } from 'react';
import items from './data';

export const RoomContext = createContext();
export const RoomConsumer = RoomContext.Consumer;

export class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true
  }

  // getData
  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(room => room.featured)
    this.setState({ rooms, featuredRooms, sortedRooms: rooms, loading: false })
  }

  formatData = items => {
    let temp = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(img => img.fields.file.url);

      let room = { ...item.fields, id, images }

      return room;
    })
    return temp;
  }

  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    console.log(slug)
    return room;
  }

  render() {
    return (
      <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom }}>
        {this.props.children}
      </RoomContext.Provider>
    )
  }
}