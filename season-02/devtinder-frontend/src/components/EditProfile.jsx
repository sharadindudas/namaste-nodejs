import { useSelector } from "react-redux";

const EditProfile = () => {
    const user = useSelector((store) => store.user);

    return (
        <div className="container mx-auto py-10 px-4 max-w-3xl">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl">Edit Profile</h2>
                    <p className="text-base-content/70">Update your DevTinder profile information</p>

                    <form className="mt-6 space-y-6">
                        {/* Profile Photo */}
                        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img
                                        src={user.photoUrl}
                                        alt="Profile"
                                    />
                                </div>
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Profile Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="photoUrl"
                                    value={user?.photoUrl}
                                    placeholder="https://example.com/photo.jpg"
                                    className="input input-bordered w-full"
                                />
                                <label className="label">
                                    <span className="label-text-alt">Provide a URL to your profile picture</span>
                                </label>
                            </div>
                        </div>

                        {/* Gender Selection */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Gender</span>
                            </label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <label className="label cursor-pointer justify-start gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        className="radio radio-primary"
                                    />
                                    <span className="label-text">Male</span>
                                </label>
                                <label className="label cursor-pointer justify-start gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        className="radio radio-primary"
                                    />
                                    <span className="label-text">Female</span>
                                </label>
                            </div>
                        </div>

                        {/* Age */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Age</span>
                            </label>
                            <input
                                type="number"
                                name="age"
                                min={18}
                                placeholder="Enter your age"
                                className="input input-bordered w-full"
                            />
                            <label className="label">
                                <span className="label-text-alt">You must be at least 18 years old</span>
                            </label>
                        </div>

                        {/* About */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">About Me</span>
                            </label>
                            <textarea
                                name="about"
                                placeholder="Tell other developers about yourself..."
                                className="textarea textarea-bordered h-32"
                            />
                        </div>

                        {/* Skills */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Skills</span>
                            </label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {/* {profile.skills.map((skill) => (
              <div key={skill} className="badge badge-lg gap-1">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="btn btn-xs btn-circle btn-ghost"
                >
                  ✕
                </button>
              </div>
            ))} */}
                            </div>
                            <div className="join w-full">
                                <input
                                    type="text"
                                    placeholder="Add a skill"
                                    className="input input-bordered join-item w-full"
                                />
                                <button
                                    type="button"
                                    className="btn join-item">
                                    +
                                </button>
                            </div>
                            <label className="label">
                                <span className="label-text-alt">Add technologies and programming languages you're proficient in</span>
                            </label>
                        </div>

                        <div className="card-actions justify-end mt-6">
                            <button
                                type="submit"
                                className={`btn btn-primary min-w-[120px]`}>
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
