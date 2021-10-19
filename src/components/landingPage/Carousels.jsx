import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { AiTwotoneStar, AiTwotoneHeart } from 'react-icons/ai';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

import * as firebase from '../../utils/firebase';

const Carousels = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    firebase.fetchRestaurants().then((data) => {
      setRestaurants(data);
    });
    return;
  }, []);

  const settings = {
    className: 'slider variable-width',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <CarouselContainer>
      <Title>合作餐廳</Title>
      <CarouselContext>
        <SlideWrapper>
          <StyledSlider {...settings}>
            {restaurants.map((restaurant) => {
              return (
                <Card>
                  <CardImg src={restaurant.imageUrl} />
                  <CardTitle>Ad eos saepe lucilius</CardTitle>
                  <Row>
                    {Array.from(Array(restaurant.rating).keys()).map(() => (
                      <Star />
                    ))}
                    <Heart />
                  </Row>
                </Card>
              );
            })}
          </StyledSlider>
        </SlideWrapper>
      </CarouselContext>
    </CarouselContainer>
  );
};

const RightArrow = ({ currentSlide, slideCount, ...props }) => {
  return <Right {...props} />;
};

const LeftArrow = ({ currentSlide, slideCount, ...props }) => {
  return <Left {...props} />;
};

const Left = styled(IoIosArrowDropleft)`
  fill: black;
`;
const Right = styled(IoIosArrowDropright)`
  fill: black;
`;

const CarouselContainer = styled.div`
  padding: 4rem 10rem;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  text-align: center;
`;

const CarouselContext = styled.div``;

const StyledSlider = styled(Slider)``;

const SlideWrapper = styled.div`
  .slick-slide {
    /* margin: 10px; */
  }
  .slick-arrow {
    background-color: #c7dbd5;
    padding: 5px;
    border-radius: 100px;
    width: 40px;
    height: 40px;
  }
  .slick-prev {
    left: -96px;
  }
  .slick-next {
    right: -96px;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
`;

const CardImg = styled.img`
  width: 100%;
  height: 60%;
  border-radius: 10px 10px 0 0;
`;

const CardTitle = styled.h4`
  text-align: center;
  margin: 1rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  text-align: center;
  padding: 0 1rem 1rem;
  margin: 0 3rem;
`;

const Star = styled(AiTwotoneStar)``;

const Heart = styled(AiTwotoneHeart)`
  margin-left: auto;
  fill: red;
`;

export default Carousels;
