import {
    EdgeProps,
    getSmoothStepPath,
} from '@xyflow/react';

export default function DefaultEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
    markerEnd,
    onDoubleClick // Adicione o parâmetro onDoubleClick
}: EdgeProps & { onDoubleClick: (event: any) => void }) {

    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition
    });

    const handleDoubleClick = () => {
        // Cálculo da posição no meio da aresta
        const midX = (sourceX + targetX) / 2;
        const midY = (sourceY + targetY) / 2;

        // Chama a função de adicionar nó de texto
        onDoubleClick({ x: midX, y: midY });
    };

    return (
        <>
            <path
                id={id}
                style={style}
                className='react-flow__edge-path stroke-2 stroke-zinc-300'
                d={edgePath}
                markerEnd={markerEnd}
                onDoubleClick={handleDoubleClick} // Adicione o manipulador de clique duplo
            />
        </>
    );
}
