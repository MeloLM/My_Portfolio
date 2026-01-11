import { useRef } from "react";
import '../App.css';
import '../style/WorkExp.css';
import { WORK_EXPS } from '../utils/data';
import ExpCard from "./ExpCard";
import Slider from "react-slick";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";



export default function WorkExp () {
  const sliderRef = useRef();

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive:[
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        },
      },
    ],
  };

  const slideRight = () => {
    sliderRef.current.slickNext();
  }

  const slideLeft = () => {
    sliderRef.current.slickPrev();
  }

  return (
    <>
      
      <section className="row exp-box" id="work-exp">
        <h3>Work Experience</h3>

        <div className="col-12 exp-content">

          <div className="right-arrow"  onClick={slideRight}>
            <span> <BsArrowRightShort /> </span>
          </div>

          <div className="left-arrow"  onClick={slideLeft}>
            <span> <BsArrowLeftShort /> </span>
          </div>

          <Slider ref={sliderRef} {...settings}>
            {WORK_EXPS.map((item) => (
              <ExpCard key={item.title} details={item} />
            ))}
          </Slider>
        </div>
      </section>

    </>
  );
}
