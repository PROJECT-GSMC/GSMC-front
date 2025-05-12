import { PostProvider } from "@repo/ui/store/postProvider";
import PostsView from "@views/posts/ui/myPosts";

const PostsPage = () => {
  return (
    <PostProvider>
      <PostsView />
    </PostProvider>
  );
};

export default PostsPage;
