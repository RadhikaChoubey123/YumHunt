import { HeroSlider } from "../components/herosection"
import Categories from "../components/Categories"
import LatestMeals from "../components/latest"

const Home = () => {
    return (
        <>
            <HeroSlider />
            <Categories />
            <LatestMeals />
        </>
    )
}
export default Home