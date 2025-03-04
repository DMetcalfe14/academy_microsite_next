const Tag = ({
    label
}) => {
    return (
        <a href={`search.html?category=${label}`}><span className="bg-primary rounded-full text-xs font-semibold text-white px-2 py-1 hover:bg-primary_hover">{label}</span></a>
    );
};

export default Tag;