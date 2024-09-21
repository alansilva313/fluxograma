import { NodeProps, Handle, Position, NodeResizer } from "@xyflow/react";
import '@xyflow/react/dist/style.css';

export function Circle({ selected }: NodeProps) {
    return (
        <div className="bg-blue-500 rounded-full w-full h-full min-w-[150px] min-h-[150px] relative flex items-center justify-center">
            
            <NodeResizer
                minWidth={150}
                minHeight={150}
                lineClassName="border-blue-400"
                handleClassName="h-3 w-3 bg-white border-2 rounded border-blue-200"
                isVisible={selected}
            />
            
            {/* Handle na direita */}
            <Handle
                id="right"
                type="source"
                position={Position.Right}
                className="-right-5 w-3 h-3 border-2 bg-blue-400/80"
            />
            
            {/* Handle na esquerda */}
            <Handle
                id="left"
                type="target"
                position={Position.Left}
                className="-left-5 w-3 h-3 border-2 bg-blue-400/80"
            />
            
        
        </div>
    );
}
