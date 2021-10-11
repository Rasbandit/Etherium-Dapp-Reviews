import React from 'react';
import { Card, StyledLink, Main } from '../Styles';

import Stars from './Stars';

const LocationList = ({ chainLocations }) => {
  return (
    <Main>
      <h2>
        Locations
      </h2>
      <ul>
        {chainLocations.map((location) => {
          return (
            <Card key={location.locationId}>
              <StyledLink to={`/locations/${location.locationId}`}>
                <h3>{location.name}</h3>
                <p>Number of Reviews: {location.reviewCount}</p>
                {/* <Stars
                  count={location.reviewAggregate / location.reviewCount || 0}
                  handleClick={() => {}}
                /> */}
                <p>
                  Average Review rating:{' '}
                  {Math.round((location.reviewAggregate / location.reviewCount)*10)/10 || 0}
                </p>
              </StyledLink>
            </Card>
          );
        })}
      </ul>
    </Main>
  );
};

export default LocationList;
