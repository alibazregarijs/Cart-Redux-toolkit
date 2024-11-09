import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
const Home = () => {
  return (
    <div>
      <div className="w-full">
        <NavBar />
      </div>
      <div className="w-full mt-20">
        <Hero />
      </div>
    </div>
  );
};

export default Home;
