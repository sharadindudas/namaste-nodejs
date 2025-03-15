const ConnectionCard = ({ connection }) => {
    const { photoUrl, name, about } = connection;
    return (
        <div className="flex items-center gap-5 bg-base-300 p-5 rounded-lg">
            <img
                src={photoUrl}
                className="w-16 h-16 rounded-full"
                alt="photo"
            />
            <div className="text-left space-y-1">
                <h3 className="font-semibold">{name}</h3>
                <p className="text-sm text-gray-300">{about}</p>
            </div>
        </div>
    );
};

export default ConnectionCard;
