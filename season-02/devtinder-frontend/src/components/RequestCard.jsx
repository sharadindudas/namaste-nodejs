const RequestCard = ({ request }) => {
    return (
        <div className="flex items-center bg-base-300 p-5 rounded-lg">
            <div className="flex items-center gap-5 flex-1">
                <img
                    src={request.photoUrl}
                    className="w-16 h-16 rounded-full"
                    alt="photo"
                />
                <div className="text-left space-y-1">
                    <h3 className="font-semibold">{request.name}</h3>
                    {request.age && request.gender && (
                        <p className="text-sm">
                            {request.age}, {request.gender}
                        </p>
                    )}
                    <p className="text-sm">{request.about}</p>
                </div>
            </div>
            <div className="space-x-3">
                <button className="btn btn-error">Reject</button>
                <button className="btn btn-primary">Accept</button>
            </div>
        </div>
    );
};

export default RequestCard;
