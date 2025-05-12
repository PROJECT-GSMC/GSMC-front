import { post } from "node_modules/@repo/ui/src/types/evidences";
import { createContext, useContext, ReactNode, useState } from "react";

interface PostContextType {
  post: post | null;
  setPost: (post: post) => void;
}

const postContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [post, setPost] = useState<post | null>(null);

  return (
    <postContext.Provider value={{ post, setPost }}>
      {children}
    </postContext.Provider>
  );
};

export const usePost = () => {
  const context = useContext(postContext);
  if (!context) throw new Error("usePost must be used within a PostProvider");
  return context;
};
