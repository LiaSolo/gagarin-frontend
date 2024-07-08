import './styles.css'


const Button = (props) => {
    return (
        <button className="button" {...props}>{props.name}</button>
    )
}

export default Button;