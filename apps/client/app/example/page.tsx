import ExampleView from "@/views/example";
import { PostProvider } from "@repo/ui/store/postProvider";

const ExamplePage = () => {
  return (
    <PostProvider>
      <ExampleView />
    </PostProvider>
  );
};

export default ExamplePage;
