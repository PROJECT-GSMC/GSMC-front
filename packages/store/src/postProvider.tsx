"use client";

import type { DraftType } from "@repo/types/draft";
import type { PostType } from "@repo/types/evidences";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface PostContextType {
  post: PostType | DraftType | undefined;
  setPost: (post: PostType | DraftType) => void;
}

const postContext = createContext<PostContextType>({
  post: undefined,
  setPost: () => {
    throw new Error("PostContext not initialized");
  },
});

const PostProvider = ({ children }: { children: ReactNode }) => {
  const [post, setPost] = useState<PostType | DraftType | undefined>();

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
