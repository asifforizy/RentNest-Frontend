import HeroBanner from "./_components/banner";
import FeaturedProperties from "./_components/FeaturedProperties";
import WhyChooseRentNest from "./_components/WhyChooseRentNest";
import HowRentNestWorks from "./_components/work";


const HomePage = () => {
  return (
    <main>
      <div>
        <div className="lg:p-20 px-4 py-10">
          <HeroBanner></HeroBanner>
        </div>

        <div className="mb-8">
          <FeaturedProperties />
        </div>
        <div>
          <HowRentNestWorks />
        </div>

        <div>
          <WhyChooseRentNest />
        </div>
      </div>

    </main>
  );
};

export default HomePage;