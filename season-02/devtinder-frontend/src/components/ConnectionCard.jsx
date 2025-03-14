const ConnectionCard = ({ connection }) => {
    return (
        <div className="flex items-center gap-5 bg-base-300 p-5 rounded-lg">
            <div className="w-16 h-16 rounded-full">
                <img
                    src={connection.photoUrl}
                    alt="photo"
                    className="w-full h-full rounded-full"
                />
            </div>
            <div className="text-left space-y-1">
                <h3 className="font-semibold">{connection.name}</h3>
                {connection.age && connection.gender && (
                    <p className="text-sm">
                        {connection.age}, {connection.gender}
                    </p>
                )}
                <p className="text-sm">{connection.about}</p>
            </div>
        </div>
    );
};

export default ConnectionCard;
