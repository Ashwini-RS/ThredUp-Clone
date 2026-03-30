import Essentials from "./Essentials";
import Promo from "./Promo";
import TrendReport from "./TrendReport";
import Brands from "./Brands";
import DailyEdit from "./DailyEdit";
import FavoritesSection from "./FavouritesSection";
import ForeverSection from "./ForeverSection";
// import Footer from "./Footer";
import Herosection from "./Herosection";

function Home() {
  return (
    <>
      
      <Herosection />
      <Essentials />
      <Promo />
      <TrendReport />
      <Brands />
      <DailyEdit />
      <FavoritesSection />
      <ForeverSection />
      {/* <Footer /> */}
    </>
  )
}

export default Home;
