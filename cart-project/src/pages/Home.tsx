import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import ListComment from "../components/ListComment";
const Home = () => {
  return (
    <div>
      <div className="w-full">
        <NavBar />
      </div>
      <div className="w-full mt-20">
        <Hero />
        <ListComment />
      </div>
    </div>
  );
};

export default Home;
