import './styles.css'

const TableRow = (props) => {
    const value = props.isProbs ? `${props.value * 100}%` : props.value;
    return (
        <>
            <div className="row">
                <p>{props.name}</p>
                <div className="lineGradientContainer" />
                <p>{value}</p>
            </div>
            {props.isProbs && <div className="probsBar" style={{width: value}} />}
        </>
    );
}

export default TableRow;