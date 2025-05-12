import { PostProvider } from "@/shared/store/postProvider";
import DetailView from "@/views/detail";

const DetailPage = () => {
  return (
    <PostProvider>
      <DetailView />
    </PostProvider>
  );
};

export default DetailPage;
