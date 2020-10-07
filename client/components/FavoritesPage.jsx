import React, { useState } from 'react';
import {useSelector} from 'react-redux'
import * as actions from '../actions/actions';
import { Link, Switch, Route } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';

const FavoritesPage = () => {
    const favorites = useSelector(state => state.informationReducer.userFavorites);
    return favorites.map((el, idx) => {
       return (<Card key ={'favcards' + idx}>
          <Card.Img variant="top" src={el.image_url} />
          <Card.Header>{el.Name}</Card.Header>
          <Card.Body>
            <Card.Text>
              Address: {el.Address1}
              HELLO this is favorites page
            </Card.Text>
            <Card.Text>
              City: {el.City}
           </Card.Text>
           <Card.Text>
              Zip: {el.zip_code}
           </Card.Text>
           <Card.Text>
              Review: {el.review_count}
           </Card.Text>
           <Card.Text>
              price: {el.price}
           </Card.Text>
         </Card.Body>
        </Card>)
    })
}


export default FavoritesPage