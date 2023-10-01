import ListComponent from "../components/ListComponent ";

const HomeScreen = () => {
  return (
    <ListComponent
      post_type="event"
      per_page="10"
      fields="id,title,acf.date,_links.wp:featuredmedia,_embedded.wp:featuredmedia"
    />
  );
};

export default HomeScreen;
