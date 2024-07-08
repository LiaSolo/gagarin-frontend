import React from "react";
import "./styles.css";
import { useState } from "react";
import {
    useFloating,
    useDismiss,
    useRole,
    useClick,
    useInteractions,
    useId,
    FloatingFocusManager,
    FloatingOverlay,
    FloatingPortal,
} from "@floating-ui/react";
import Button from "../Button";

const Drawner = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
    });
    const click = useClick(context);
    const role = useRole(context);
    const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        role,
        dismiss,
    ]);

    const [x, y, width, height] = props.coord;

    return (
        <>
            <canvas
                ref={refs.setReference}
                {...getReferenceProps()}
                className="rectangle"
                style={{
                    height: height * props.sizeCoef,
                    width: width * props.sizeCoef,
                    top: y * props.sizeCoef,
                    left: x * props.sizeCoef,
                }}
            />
            <FloatingPortal>
                {isOpen && (
                    <FloatingOverlay className="dialogOverlay" lockScroll>
                        <FloatingFocusManager context={context}>
                            <div
                                className="dialog"
                                ref={refs.setFloating}
                                {...getFloatingProps()}
                            >
                                <h2>Найденная информация</h2>
                                <p>{props.text}</p>
                                <Button
                                    name="Закрыть"
                                    onClick={() => setIsOpen(false)}
                                />
                            </div>
                        </FloatingFocusManager>
                    </FloatingOverlay>
                )}
            </FloatingPortal>
        </>
    );
};

export default Drawner;
