import React, { Component, createContext } from 'react';
import items from './data';

export const RoomContext = createContext();
export const RoomConsumer = RoomContext.Consumer;

export class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: true,
    pets: true
  }

  // getData
  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(room => room.featured)
    let maxPrice = Math.max(...rooms.map(item => item.price));
    let maxSize = Math.max(...rooms.map(item => item.size));

    this.setState({ rooms, featuredRooms, sortedRooms: rooms, loading: false, maxSize, maxPrice, price: maxPrice })
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

  handleChange = event => {
    const target = event.target;
    console.log(target.name)
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    // setState is async , accept callback
    this.setState({ [name]: value }, this.filterRooms)
  }

  filterRooms = () => {
    let {
      rooms, type, capacity, price, minSize, maxSize, breakfast, pets
    } = this.state;

    capacity = +capacity;
    price = +price;
    minSize = +minSize;
    maxSize = +maxSize;

    let tempRooms = [...rooms];
    if (type !== 'all') {
      tempRooms = tempRooms.filter(room => room.type === type);
    }
    // filter by capacity
    if (capacity !== 1)
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);

    // filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);
    //filter by size
    tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)
    // filter by breakfast
    tempRooms = tempRooms.filter(room => room.breakfast === breakfast);
    // filter by pets
    tempRooms = tempRooms.filter(room => room.pets === pets);
    this.setState({ sortedRooms: tempRooms })
  }
  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    console.log(slug)
    return room;
  }

  render() {
    return (
      <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom, handleChange: this.handleChange }}>
        {this.props.children}
      </RoomContext.Provider>
    )
  }
}

// use higher order componnet
export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return <RoomConsumer>
      {value => <Component {...props} context={value} />}
    </RoomConsumer>
  }
}
