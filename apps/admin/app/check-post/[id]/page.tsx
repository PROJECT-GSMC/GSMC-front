import PostsView from "@/views/check-post/ui/posts";
import { PostProvider } from "@repo/ui/store/postProvider";

const CheckPostPage = () => {
  return (
    <PostProvider>
      <PostsView />
    </PostProvider>
  );
};

export default CheckPostPage;
