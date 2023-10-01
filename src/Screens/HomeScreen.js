import ListComponent from "../components/ListComponent ";

const HomeScreen = () => {
  return (
    <ListComponent
      post_type="event"
      per_page="10"
      fields="id,title,[acf]date,_embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url"
    />
  );
};

export default HomeScreen;
