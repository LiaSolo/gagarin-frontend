import "./styles.css";
import Loading from "../Loading";
import { useAtom } from "jotai";
import { responseAtom, imageURLAtom } from "../../atoms";
import Drawner from "../Drawner";
import InfoContainer from "../InfoContainer";
import React, { useEffect, useRef, useState } from "react";

const compare = (a, b) => {
    if (a.text < b.text) {
        return 1;
    }
    if (a.text > b.text) {
        return -1;
    }
    return 0;
};

const Result = () => {
    const [response] = useAtom(responseAtom);
    const [imageURL] = useAtom(imageURLAtom);
    const [sizeCoef, setSizeCoef] = useState(0);

    const imageRef = useRef();

    const getCoef = setTimeout(() => {
        const img = new Image();
        img.src = imageURL;
        const imgNaturalWidth = img.naturalWidth;
        const actualSize = imageRef.current ? imageRef.current.clientWidth : 316;
        setSizeCoef(actualSize / imgNaturalWidth);
    }, 1000);

    console.log(getCoef)

    const data = response && response.data;
    const probabilities = data && data.probabilities;

    const allTypes =
        probabilities &&
        [
            { field: "Паспорт", text: probabilities.personal_passport },
            { field: "Права", text: probabilities.driver_license },
            { field: "ПТС", text: probabilities.vehicle_passport },
            { field: "СТС", text: probabilities.vehicle_certificate },
        ].sort(compare);

    const fields = data && data.fields;
    const segments = data && data.segments;

    return (
        <div className="resultContainer">
            {response ? (
                <>
                    <div className="stickyContent">
                        <h1>Результат</h1>
                        <p>
                            Нажми на выбранный прямоугольник, чтобы узнать
                            найденную информацию
                        </p>
                        <div className="size" ref={imageRef}>
                            <img src={imageURL} width="100%" height="100%" />
                            {segments.map((rect, indx) => (
                                <Drawner
                                    key={indx}
                                    sizeCoef={sizeCoef}
                                    coord={rect.bb}
                                    text={rect.text}
                                />
                            ))}
                        </div>
                    </div>

                    <InfoContainer
                        header={`Наиболее вероятный тип: ${allTypes[0].field}`}
                        info={[]}
                    />
                    <InfoContainer header={`Общая информация`} info={fields} />
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default Result;
