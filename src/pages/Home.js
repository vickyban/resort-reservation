import React from 'react';
import { Hero } from '../components/Hero';
import { Banner } from '../components/Banner';
import { Link } from 'react-router-dom';
import { Services } from '../components/Services';
import { FeatureRooms } from '../components/FeatureRooms';

export const Home = () => {
  return (
    <>
      <Hero >
        <Banner title="luxurious rooms" subtitle="deluxe rooms starting at $299">
          <Link to="/rooms" className="btn-primary" >Our Rooms</Link>
        </Banner>
      </Hero>
      <Services />
      <FeatureRooms />
    </>
  )
}
