import { useState, useCallback, useEffect } from "react";
import { NodeResizer } from "@xyflow/react";

const TextNode = ({ data, selected }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(data.text);
    const [fontSize, setFontSize] = useState(16); // Tamanho da fonte inicial
    const [isResizing, setIsResizing] = useState(false);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleMouseMove = useCallback((event: MouseEvent) => {
        if (isResizing) {
            if (event.shiftKey) {
                // Aumentar ou diminuir a fonte ao segurar Shift
                setFontSize((prevSize) => Math.max(prevSize + Math.sign(event.movementY), 8));
            }
        }
    }, [isResizing]);

    useEffect(() => {
        const handleMouseUp = () => {
            setIsResizing(false);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        const handleMouseDown = (event: MouseEvent) => {
            if (selected && event.target.classList.contains("resize-handle")) {
                setIsResizing(true);
                window.addEventListener("mousemove", handleMouseMove);
                window.addEventListener("mouseup", handleMouseUp);
            }
        };

        window.addEventListener("mousedown", handleMouseDown);
        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
        };
    }, [handleMouseMove, selected]);

    return (
        <div
            className={`w-full h-full ${text ? '' : 'border border-1'}`} // Borda aparece apenas se não houver texto
            onDoubleClick={handleDoubleClick}
        >
            <NodeResizer
                lineClassName="border-blue-400"
                handleClassName="resize-handle h-3 w-3 bg-white border-2 rounded border-blue-200 cursor-nwse-resize"
                isVisible={selected}
            />
            {isEditing ? (
                <input
                    type="text"
                    value={text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                    className="w-full h-full border-none p-1"
                    style={{ fontSize: `${fontSize}px` }} // Aplicando o tamanho da fonte
                />
            ) : (
                <span style={{ fontSize: `${fontSize}px` }}>{text}</span> // Aplicando o tamanho da fonte
            )}
        </div>
    );
};

export default TextNode;
