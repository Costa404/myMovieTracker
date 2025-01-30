import { usePostFriendship } from "../../../Api/post/postFriendship";

type AddFriendButtonType = {
  userId: string;
  friendId: string;
};

const AddFriendButton = ({ userId, friendId }: AddFriendButtonType) => {
  const { loading, added, handleAddFriend } = usePostFriendship();

  return (
    <button
      className="btn btn-primary px-3"
      onClick={() => handleAddFriend(userId, friendId)}
      disabled={loading || added}
    >
      {added ? "Friend Added" : loading ? "Adding..." : "Add Friend"}
    </button>
  );
};

export default AddFriendButton;
