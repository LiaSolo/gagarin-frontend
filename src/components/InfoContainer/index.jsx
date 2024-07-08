import "./styles.css";
import TableRow from "../TableRow";

const InfoContainer = (props) => {
    return (
        <div className="container">
            <h2>{props.header}</h2>
            {props.info.map((row, indx) => (
                <TableRow
                    key={indx}
                    name={row.field}
                    value={row.text}
                    isProbs={props.isProbs}
                />
            ))}
        </div>
    );
};

export default InfoContainer;
