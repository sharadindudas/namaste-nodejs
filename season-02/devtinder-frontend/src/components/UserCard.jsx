const UserCard = (props) => {
    const { name, about, age, gender, photoUrl } = props?.user;

    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt="Shoes"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-error">Ignore</button>
                    <button className="btn btn-primary">Interested</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
