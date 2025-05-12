import { createContext, useContext, ReactNode, useState } from "react";
import {
  Activity,
  Others,
  Reading,
} from "node_modules/@repo/ui/src/types/evidences";

interface PostContextType {
  post: Activity | Reading | Others | null;
  setPost: (post: Activity | Reading | Others) => void;
}

const postContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: Activity | Reading | Others;
}) => {
  const [post, setPost] = useState<Activity | Reading | Others | null>(value);

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
