import Header from "@shared/ui/header";
import PostsWidget from "@/widgets/posts/ui";

const PostsView = () => {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <PostsWidget />
    </div>
  );
};

export default PostsView;
