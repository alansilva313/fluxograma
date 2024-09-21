import { NodeProps, Handle, Position, NodeResizer } from "@xyflow/react";
import '@xyflow/react/dist/style.css';

export function Diamond({ selected }: NodeProps) {
    return (
        <div className="relative w-full h-full min-w-[200px] min-h-[200px]">
            {/* Retângulo invisível para as conexões */}
            <div className="w-full h-full absolute top-0 left-0">
                <NodeResizer
                    minWidth={200}
                    minHeight={200}
                    lineClassName="border-blue-400"
                    handleClassName="h-3 w-3 bg-white border-2 rounded border-blue-200"
                    isVisible={selected}
                />
            </div>

            {/* Handles para conexão */}
            <Handle
                id="top"
                type="source"
                position={Position.Top}
                className="w-3 h-3 border-2 bg-blue-400/80"
                style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            />
            <Handle
                id="bottom"
                type="target"
                position={Position.Bottom}
                className="w-3 h-3 border-2 bg-blue-400/80"
                style={{
                    position: 'absolute',
                    bottom: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            />
            <Handle
                id="left"
                type="source"
                position={Position.Left}
                className="w-3 h-3 border-2 bg-blue-400/80"
                style={{
                    position: 'absolute',
                    left: '-10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
            />
            <Handle
                id="right"
                type="target"
                position={Position.Right}
                className="w-3 h-3 border-2 bg-blue-400/80"
                style={{
                    position: 'absolute',
                    right: '-10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
            />

            {/* Diamante central que cresce junto com o contêiner */}
            <div className="absolute inset-0 p-4 flex items-center justify-center">
                <div
                    className="bg-green-500 w-[80%] h-[80%]"
                    style={{
                        transform: 'rotate(45deg)',  // Rotaciona para formar um diamante
                    }}
                >
                    {/* Conteúdo do diamante */}
                    <div
                        className="text-white flex items-center justify-center h-full"
                        style={{
                            transform: 'rotate(-45deg)',  // Reverte a rotação para o texto
                            height: '100%',
                        }}
                    >
                     
                    </div>
                </div>
            </div>
        </div>
    );
}
