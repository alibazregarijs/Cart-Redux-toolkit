import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Comment from "../components/Comment";
const Home = () => {
  return (
    <div>
      <div className="w-full">
        <NavBar />
      </div>
      <div className="w-full mt-20">
        <Hero />
        <Comment />
      </div>
    </div>
  );
};

export default Home;
