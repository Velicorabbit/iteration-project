import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as actions from '../actions/actions';
import { Link, Switch, Route } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';

const FavoritesPage = () => {
  const favorites = useSelector(
    (state) => state.informationReducer.userFavorites
  );
  const cards = favorites.map((el, idx) => {
    return (
      <Card
        key={'favcards' + idx}
        style={{ width: '400px' }}
        className="favorite-card"
      >
        <Card.Img variant="top" src={el.yelp_url} />
        <Card.Header>{el.alias}</Card.Header>
        <Card.Body>
          <Card.Text>Address: {el.address1}</Card.Text>
          <Card.Text>City: {el.city}</Card.Text>
          <Card.Text>Zip: {el.zip_code}</Card.Text>
          <Card.Text>Review: {el.review_count}</Card.Text>
          <Card.Text>price: {el.price}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  return <div className="fav-cards">{cards}</div>;
};

export default FavoritesPage;
