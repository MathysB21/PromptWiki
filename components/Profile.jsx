import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, favourites, handleEdit, handleDelete, handleStar }) => {
  return (
    <section className='w-full'>
      <h1 className='text-left head_text'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      {/* User Favourited Prompts, they'll only be displayed on my profile */}
      {favourites && favourites.length !== 0 && (
        <>
          <h2 className="text-left text-3xl block mt-10">
            <span className="orange_gradient">My Favourites</span>
          </h2>
          <div className='prompt_layout'>
            {favourites.map((post, index) => (
              <PromptCard
                key={index}
                post={post}
                favourited={post.favourite}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
                handleStar={handleStar}
              />
            ))}
          </div>
        </>
      )}

      {/* User Created Prompts */}
      <h2 className="text-left text-3xl block mt-10">
        <span className="orange_gradient">{name} Posts</span>
      </h2>
      <div className='prompt_layout'>
        {data && data.map((post) => (
          <PromptCard
            key={post._id}
            favourited={post.favourite}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
            handleStar={handleStar}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;