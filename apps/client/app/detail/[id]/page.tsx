import DetailView from "@/views/detail";
import { PostProvider } from "@repo/ui/store/postProvider";

const DetailPage = () => {
  return (
    <PostProvider>
      <DetailView />
    </PostProvider>
  );
};

export default DetailPage;
