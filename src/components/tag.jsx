import Link from 'next/link';

const Tag = ({
    label
}) => {
    return (
        <Link href={{pathname: "/search", query: { category: label }}}><span className="bg-primary rounded-full text-xs font-semibold text-white px-2 py-1 hover:bg-primary_hover">{label}</span></Link>
    );
};

export default Tag;