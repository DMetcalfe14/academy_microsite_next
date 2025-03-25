const Tag = ({ label }) => {
    return (
        <a 
            href={`search.html?category=${label}`} 
            className="bg-primary rounded-full text-xs font-semibold text-label px-2 py-1 hover:bg-primary_hover focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary_hover"
            aria-label={`Search for category ${label}`}
        >
            <span>{label}</span>
        </a>
    );
};

export default Tag;
