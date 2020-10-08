import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';

const mapStateToProps = ({
  informationReducer: { lat, long, countryCode },
}) => ({ lat, long, countryCode });

const NewsView = (props) => {
  const [newsData, setNewsData] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);
  const [currentArticles, setCurrentArticles] = useState([]);

  const DEFAULT_IMG = 'https://joebalestrino.com/wp-content/uploads/2019/02/Marketplace-Lending-News.jpg';

  const createNewsArticles = (newsObject, category = 'business') => {
    console.log('newsObject: ', newsObject);
    return newsObject[category].map((newsInfo, i) => {
      return (
        // TODO: transfer in-line styles to styles.css
        <Card key={`news-card-${i}`}>
          <div className="card-img-container">
            <a href={newsInfo.url}>
              <Card.Img className="card-img" variant="top" src={newsInfo.urlToImage || DEFAULT_IMG} />
            </a>
          </div>
          <Card.Body>
            <Card.Title>{newsInfo.title}</Card.Title>
            <Card.Text>{newsInfo.source.name}</Card.Text>
          </Card.Body>
        </Card>
      );
    });
  };

  const fetchData = (category = 'business') => {
    fetch(`/news/${props.countryCode}?category=${category}`, {
      method: 'GET',
      headers: {
        "Content-Type": "Application/JSON",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNewsData(data.news);
        setFetchedData(true);
        setCurrentArticles(createNewsArticles(data.news));
      })
      .catch(err => console.log('News fetch ERROR: ', err));
  };

  const changeCategory = (category) => {
    return () => {
      setCurrentArticles(createNewsArticles(newsData, category));
    };
  };

  useEffect(() => {
    if (!fetchedData) fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [props.city]);

  useEffect( () => {
    fetchData();
  }, [props.city])

  if (!newsData) return null;

  if (fetchedData) {
    const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
    const buttonsArray = [];

    for (let i = 0; i < CATEGORIES.length; i += 1) {
      buttonsArray.push(
        <Button
          key={`b${i}`}
          variant="dark"
          className="btn-sm mx-1 my-3"
          onClick={changeCategory(CATEGORIES[i])}
        >
          {CATEGORIES[i]}
        </Button>,
      );
    }

    return (
      <div className="news-container">
        <h1 id="title">Local News Information</h1>
        {buttonsArray}
        <div className="cards-container">
          <CardDeck>
            {currentArticles}
          </CardDeck>
        </div>
      </div>
    );
  } else {
    return (
      <h1 id="title">Fetching from database</h1>
    );
  }
};
export default connect(mapStateToProps, null)(NewsView);
