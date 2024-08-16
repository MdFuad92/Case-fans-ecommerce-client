import About from "../components/About";
import Banner from "../components/Banner";
import Contact from "../components/Contact";
import FeaturedFans from "../components/FeaturedFans";
import Services from "../components/Services";
import Sponsors from "../components/Sponsors";


const Home = () => {
    return (
        <div>
            <Banner/>
            <Services/>
            <FeaturedFans/>
            <Sponsors/>
            <About/>
            <Contact/>

         
        </div>
    );
};

export default Home;