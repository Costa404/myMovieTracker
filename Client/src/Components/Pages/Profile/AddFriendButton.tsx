import { usePostFriendship } from "../../../Api/ApiNode/post/postFriendship";
import ActionButton from "../../Utility/ActionButton";

type AddFriendButtonType = {
  userId: string;
  friendId: string;
};

const AddFriendButton = ({ userId, friendId }: AddFriendButtonType) => {
  const { loading, added, handleAddFriend } = usePostFriendship();

  return (
    <div className=" d-flex justify-content-between">
      <ActionButton
        label={added ? "Friend Added" : loading ? "Adding..." : "Add Friend"}
        onClick={() => handleAddFriend(userId, friendId)}
        disabled={loading || added}
      />
      {added && (
        <ActionButton
          label="Remove Friend"
          className="btn btn-danger"
          style={{ background: "#dc3545", border: "none" }}
        />
      )}
    </div>
  );
};

export default AddFriendButton;
