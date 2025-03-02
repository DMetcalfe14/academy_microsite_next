const Toggle = ({ label, fct, active }) => {
    return <button onClick={fct} className={`toggle px-4 py-2 rounded-full font-semibold ${active ? "bg-primary text-white border-2 border-transparent" : "border-primary text-primary border-2 hover:bg-primary hover:text-white"}`} aria-pressed={active}>{ label }</button>
}

export default Toggle;