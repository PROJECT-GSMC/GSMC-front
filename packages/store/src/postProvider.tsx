"use client";

import type { post } from "@repo/types/evidences";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface PostContextType {
  post: post | null;
  setPost: (post: post) => void;
}

const postContext = createContext<PostContextType>({
  post: null,
  setPost: () => {
    throw new Error("PostContext not initialized");
  },
});

const PostProvider = ({ children }: { children: ReactNode }) => {
  const [post, setPost] = useState<post | null>(null);

  return (
    <postContext.Provider value={{ post, setPost }}>
      {children}
    </postContext.Provider>
  );
};

const usePost = (): PostContextType => {
  return useContext(postContext);
};

export { PostProvider, usePost };