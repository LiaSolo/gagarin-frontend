import React, { useRef } from "react";
import axios from "axios";
import Button from "../Button";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { responseAtom, imageURLAtom } from "../../atoms";

const Uploader = () => {
    const inputRef = useRef();
    const navigate = useNavigate();

    const [response, setResponse] = useAtom(responseAtom);
    const [imageURL, setImageURL] = useAtom(imageURLAtom);

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

    async function handleChange(e) {
        const file = e.target.files[0];

        let data = await toBase64(file);
        const startString = data.indexOf(",") + 1;
        data = data.slice(startString);

        try {
            axios
                .post("http://localhost:8000/process", { image: data })
                .then((response) => setResponse(response));
        } catch (error) {
            console.error(error);
        }

        setImageURL(URL.createObjectURL(e.target.files[0]));
        navigate("/result");
    }

    return (
        <div className="uploader">
            <h1>Инновационное решение для обработки документов!</h1>
            <p>
                Позволяет по фото определить тип документа (паспорт,
                водительское удостоверение и т.д.) и выделить информацию
            </p>
            <p>Загрузите фото-скан документа, чтобы начать</p>
            <div className="buttonContainer">
                <Button
                    onClick={() => inputRef.current.click()}
                    name="Выбрать файл"
                />

                <input
                    ref={inputRef}
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                />
            </div>
        </div>
    );
};

export default Uploader;
