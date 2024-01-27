import { useParams } from "react-router-dom";

const CategoryLandingPage = () => {
  let { category } = useParams();
  category = category.split('-')[1].toUpperCase();

  return (
    <div>
      <h1>Category { category } Landing Page </h1>
    </div>
  );
}
 
export default CategoryLandingPage;