import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { PostStats } from "@/components/shared";
import { useUserContext } from "@/context/AuthContext";
import PostStars from "../stars/PostStars";
import { multiFormatDateString } from "@/lib/utils";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  // Filter out posts that do not exist (deleted posts)
  const filteredPosts = posts.filter((post) => !!post);

  return (
    <ul className="grid-container">
      {filteredPosts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <div className="stars-container p-2 flex justify-between absolute top-0 w-full bg-gradient-to-b from-dark-3 to-transparent rounded-t-[24px]">
              <div className="text-2xl">
                <PostStars stars={post.stars} />
              </div>
              <span>{multiFormatDateString(post?.$createdAt)}</span>
            </div>
            {post.imageUrl ? (
              // Render image and caption side by side
              <div className="flex h-full">
                <img
                  src={post.imageUrl}
                  alt="post"
                  className="h-full  object-cover"
                />
              </div>
            ) : (
              // Render centered caption if no image
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="line-clamp-4">{post.caption}</p>
                  <p className="mt-4">"No image"</p>
                </div>
              </div>
            )}
          </Link>
          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={
                    post.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
