import { useState } from "react";
import { NodeProps, Handle, Position, NodeResizer } from "@xyflow/react";
import '@xyflow/react/dist/style.css';

export function Square({ selected, data }: NodeProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [label, setLabel] = useState(data?.label || "");

    const handleDoubleClick = () => {
        setIsEditing(true); // Ativa o modo de edição ao clicar duas vezes
    };

    const handleBlur = () => {
        setIsEditing(false); // Desativa o modo de edição ao clicar fora
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setIsEditing(false); // Confirma o texto ao pressionar "Enter"
        }
    };

    return (
        <div
            className="bg-violet-500 rounded w-full h-full min-w-[200px] min-h-[200px] flex items-center justify-center"
            onDoubleClick={handleDoubleClick}
        >
            <NodeResizer
                minWidth={200}
                minHeight={200}
                lineClassName="border-blue-400"
                handleClassName="h-3 w-3 bg-white border-2 rounded border-blue-200"
                isVisible={selected}
            />

            {/* Handles para conectar nós */}
            <Handle
                id="right"
                type="source"
                position={Position.Right}
                className="-right-5 w-3 h-3 border-2 bg-blue-400/80"
            />

            <Handle
                id="left"
                type="target"
                position={Position.Left}
                className="-left-5 w-3 h-3 border-2 bg-blue-400/80"
            />

            <Handle
                id="top"
                type="source"
                position={Position.Top}
                className="-top-5 w-3 h-3 border-2 bg-blue-400/80"
            />

            <Handle
                id="bottom"
                type="target"
                position={Position.Bottom}
                className="-bottom-5 w-3 h-3 border-2 bg-blue-400/80"
            />

            {/* Exibe o campo de input ao clicar duas vezes */}
            {isEditing ? (
                <input
                    type="text"
                    value={String(label)}
                    onChange={(e) => setLabel(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="bg-white text-black p-1 rounded"
                />
            ) : (
                <div className="text-white">
                    {String(label)}
                </div>
            )}
        </div>
    );
}
