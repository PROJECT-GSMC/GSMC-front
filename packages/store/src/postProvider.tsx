"use client";

const React = require("react") as typeof import("react");
import type { ReactNode } from "react";
import type { post } from "@repo/types/evidences";

interface PostContextType {
  post: post | null;
  setPost: (post: post) => void;
}

const postContext = React.createContext<PostContextType | undefined>(undefined);

const PostProvider = ({ children }: { children: ReactNode }) => {
  const [post, setPost] = React.useState<post | null>(null);

  return (
    <postContext.Provider value={{ post, setPost }}>
      {children}
    </postContext.Provider>
  );
};

const usePost = () => {
  const context = React.useContext(postContext);
  if (!context) throw new Error("usePost must be used within a PostProvider");
  return context;
};

module.exports = { PostProvider, usePost };