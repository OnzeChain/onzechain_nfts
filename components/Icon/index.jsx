const Icon = ({ icon, text, extraStyle }) => {
    return (
        <div className={'flex items-center justify-center transition-all text-sm ' + extraStyle}>
            {text}
            {icon}
        </div>
    )
}

export default Icon;