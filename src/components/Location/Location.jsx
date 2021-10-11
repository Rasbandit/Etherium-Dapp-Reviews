import React, { useEffect, useState } from 'react';
import { Button } from '@podiumhq/podium-ui';
import { Formik, Field, Form } from 'formik';
import { useParams } from 'react-router-dom';
import Stars from './Stars';
import { Card, StyledLink, Main, FormDiv } from '../Styles';

import LocationJson from '../../abis/Location.json';
import LocationFactoryJson from '../../abis/LocationFactory.json';

const StarsInput = () => (
  <Field name="rating" id="rating" type="number">
    {({ field: { value }, form: { setFieldValue } }) => (
      <div>
        <div>
          <Stars
            count={value}
            handleClick={(number) => setFieldValue('rating', number)}
          />
        </div>
      </div>
    )}
  </Field>
);

const Review = ({ connectedAccount }) => {
  const { locationId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [locationContract, setLocationContract] = useState({});
  const [name, setName] = useState('');
  const [reviewAggregate, setReviewAggregate] = useState('');
  const [reviewCount, setReviewCount] = useState('');

  const someFunctionName = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const networkData = LocationFactoryJson.networks[networkId];
    if (networkData) {
      const locationFactory = new web3.eth.Contract(
        LocationFactoryJson.abi,
        networkData.address
      );
      let locationContractAddress = await locationFactory.methods
        .locations(locationId)
        .call();

      const _locationContract = new web3.eth.Contract(
        LocationJson.abi,
        locationContractAddress
      );

      setLocationContract(_locationContract);

      setName(await _locationContract.methods.name().call());
      setReviewAggregate(
        await _locationContract.methods.reviewAggregate().call()
      );
      const _reviewCount = await _locationContract.methods.reviewCount().call();
      setReviewCount(_reviewCount);

      const reviewsPromises = [];

      for (let i = 0; i < _reviewCount; ++i) {
        reviewsPromises.push(_locationContract.methods.reviews(i).call());
      }

      setReviews(await Promise.all(reviewsPromises));
    } else {
      window.alert('Schloadcoin contract not deployed to detected network.');
    }
  };

  useEffect(() => {
    someFunctionName();
  }, [locationId]);

  const createReview = async (text, rating) => {
    let x = await locationContract.methods
      .addReview(text, rating)
      .send({ from: connectedAccount });

    someFunctionName();
  };

  const [haveReviewed, setHaveReviewed] = useState(true);

  useEffect(() => {
    setHaveReviewed(
      reviews.filter((review) => review.user === connectedAccount).length > 0
    );
  }, [reviews]);

  // console.log({ locationContract, name, reviewAggregate, reviewCount});

  return (
    <Main>
      {!haveReviewed && (
        <Formik
          initialValues={{
            reviewText: '',
            rating: null,
          }}
          onSubmit={(values) => {
            createReview(values.reviewText, values.rating);
          }}
        >
          <Form>
            <FormDiv>
              <label htmlFor="reviewText">Review</label>
              <Field id="reviewText" name="reviewText"></Field>
              <div style={{ width: '300px' }}>
                <StarsInput />
              </div>
            </FormDiv>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      )}
      {reviews.map((review, i) => (
        <Card
          key={i}
        >
          <h2>User: {review.user}</h2>
          <div>Rating: {review.rating}</div>
          <div>Review: {review.text}</div>
        </Card>
      ))}
    </Main>
  );
};

export default Review;
