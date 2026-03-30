import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Herosection() {

    const settings = {
        infinite: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <>
            <div className="sliders">
                <Slider {...settings}>
                    <section className="Herosection">
                        <a href=""><img src="images/promo.webp" className="hero-banner" alt="" /></a>
                    </section>

                    <section className="Herosection" >
                        <a href=""><img src="images/carouselthredup.webp"  alt="" /></a>
                    </section>
                </Slider>
            </div>
        </>
    );
}

export default Herosection;