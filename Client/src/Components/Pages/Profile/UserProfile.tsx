import { useGetProfileUser } from "../../../Api/get/getProfileUser";

import { useCurrentUser } from "../../../Context/useCurrentUserAuth";
import AddFriendButton from "./AddFriendButton";
import LoadingSpinner from "../../Utility/Loading/Loading";
interface Review {
  id: number;
  movietitle?: string;
  review?: string;
  rating?: number;
  created_at?: string;
}

const UserProfile = () => {
  const { profileData, loading, error } = useGetProfileUser();
  const { currentUser } = useCurrentUser();

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  if (!profileData || profileData.length === 0) {
    return <div>No profile data available.</div>;
  }

  if (currentUser?.username === profileData[0]?.username) {
    return <div>You cannot add yourself as a friend.</div>;
  }

  const friendId = profileData[0]?.username;
  const profilePicture = profileData[0]?.profile_picture;

  return (
    <div className="container  min-vh-100 ">
      <div className="card shadow-sm" style={{ paddingTop: "10rem" }}>
        <div className="card-body">
          <div className="text-center">
            <img
              src={profilePicture || "https://via.placeholder.com/150"}
              alt={`${profileData[0]?.username}'s profile`}
              className="rounded-circle mb-3 mt-5"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <h1 className="card-title">{profileData[0]?.username}'s Reviews</h1>
          </div>

          {/* Seção de Reviews */}
          <div className="profile-reviews mt-4">
            <h3 className="mb-3 fw-bold">Reviews</h3>
            {profileData.length > 0 ? (
              <div className="list-group ">
                {profileData.map((review: Review) => (
                  <div key={review.id} className="list-group-item mb-3">
                    <h5 className="fw-bold fs-4">
                      {review.movietitle || "Unknown Movie"}
                    </h5>
                    <p className="fw-semibold fs-5">
                      {review.review || "No review provided."}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-warning text-dark fs-4">
                        {review.rating ? `${review.rating} Stars` : "No rating"}
                      </span>
                      <small>
                        {review.created_at
                          ? new Date(review.created_at).toLocaleDateString()
                          : "No date"}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews found.</p>
            )}
            <AddFriendButton
              userId={currentUser?.username || ""}
              friendId={friendId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
