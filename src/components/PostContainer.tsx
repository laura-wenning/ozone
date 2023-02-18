import React from "react";
import * as posts from '../../public/data/posts.json'; 
import { Post } from "./Post";

export const PostContainer = () => {
    return(
        <div>
            {posts.map((post)=>{
                return(
                    <Post content = {post.content}/>
                )
            })}
        </div>
    )
}