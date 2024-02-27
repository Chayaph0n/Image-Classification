
const Button = ({ color, text }) => {
    
    let button = `w-36 h-11 mt-3 text-white bg-${color} flex items-center justify-center rounded-xl 
    hover:bg-white hover:text-${color} transition-colors 
    duration-300 cursor-pointer shadow-xl hover:shadow-none`;

    console.log(button);

    return(
        <div className={button}>{text}</div>
    )
}

export default Button;