import { useCallback, useState } from "react";
import { addEdge, Background, Connection, ConnectionMode, Node, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import { Square } from "./nodes/Square";
import { Circle } from "./nodes/Circle";
import { Diamond } from "./nodes/Diamond";
import TextNode from "./nodes/TextNode"; // Importe o novo nó de texto
import '@xyflow/react/dist/style.css';
import DefaultEdge from "./edges/DefaultEdge";
import * as ToolBar from "@radix-ui/react-toolbar";


const NODE_TYPES = {
    square: Square,
    circle: Circle,
    diamond: Diamond,
    text: TextNode, // Adicione o tipo de nó de texto
};

const EDGE_TYPES = {
    default: DefaultEdge
};

export default function Flow() {
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
    const [flowTitle, setFlowTitle] = useState('');
    const [savedFlows, setSavedFlows] = useState<{ title: string, flow: { nodes: any[], edges: any[] } }[]>([]);

    const onConnect = useCallback((connection: Connection) => {
        setEdges((edges) => addEdge(connection, edges));
    }, []);

    function addSquareNode() {
        const newNode: Node = {
            id: crypto.randomUUID(),
            type: 'square',
            position: { x: 750, y: 350 },
            data: { name: "New Square", nodeType: "decisão" } // Mapeando tipo
        };
        setNodes((nodes) => [...nodes, newNode]);
    }

    function addCircleNode() {
        const newNode: Node = {
            id: crypto.randomUUID(),
            type: 'circle',
            position: { x: 300, y: 300 },
            data: { nodeType: "pergunta" } // Mapeando tipo
        };
        setNodes((nodes) => [...nodes, newNode]);
    }

    function addDiamondNode() {
        const newNode: Node = {
            id: crypto.randomUUID(),
            type: 'diamond',
            position: { x: 500, y: 500 },
            data: { nodeType: "resposta" } // Mapeando tipo
        };
        setNodes((nodes) => [...nodes, newNode]);
    }

    function addTextNode(position?: { x: number, y: number }) {
        const newNode: Node = {
            id: crypto.randomUUID(),
            type: 'text',
            position: position || { x: 400, y: 400 }, // Usa a posição passada ou padrão
            data: { text: "Novo Texto", nodeType: "finalização" } // Mapeando tipo
        };
        setNodes((nodes) => [...nodes, newNode]);
    }

    const onSave = () => {
        const flow = { 
            nodes: nodes.map(node => ({
                id: node.id,
                type: node.type,
                position: node.position,
                data: { ...node.data, text: node.data.text || "" } // Inclui texto caso exista
            })), 
            edges 
        };
        const newSavedFlow = { title: flowTitle, flow };
        const updatedFlows = [...savedFlows, newSavedFlow];
        setSavedFlows(updatedFlows);
        localStorage.setItem("savedFlows", JSON.stringify(updatedFlows));
        alert("Fluxo salvo com sucesso!");
        setFlowTitle('');
    };

    const onLoad = () => {
        const savedFlow = localStorage.getItem("savedFlows");
        if (savedFlow) {
            const loadedFlows = JSON.parse(savedFlow);
            setSavedFlows(loadedFlows);
        } else {
            alert("Nenhum fluxo salvo encontrado.");
        }
    };

    const loadFlow = (flow: { nodes: any, edges: any }) => {
        setNodes(flow.nodes);
        setEdges(flow.edges);
    };

    const handleDoubleClickOnEdge = (position: { x: number, y: number }) => {
        addTextNode(position); // Adiciona um nó de texto na posição clicada
    };

    return (
        <div className="w-full h-screen">
            <ReactFlow
                nodeTypes={NODE_TYPES}
                nodes={nodes}
                edgeTypes={{ ...EDGE_TYPES, default: (props) => <DefaultEdge {...props} onDoubleClick={handleDoubleClickOnEdge} /> }} // Passa a função para o edge
                connectionMode={ConnectionMode.Loose}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodesChange={onNodesChange}
                defaultEdgeOptions={{ type: 'default' }}
            >
                <Background
                 bgColor="#ffff"
                 lineWidth={2}
                />
            </ReactFlow>

            <ToolBar.Root className="flex fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-[650px] overflow-hidden gap-2">
                <ToolBar.Button onClick={addSquareNode} className="w-32 h-32 bg-violet-500 rounded mt-6 transition-transform hover:-translate-y-2" />
                <ToolBar.Button onClick={addCircleNode} className="w-32 h-32 bg-blue-500 rounded-full mt-6 transition-transform hover:-translate-y-2" />
                <ToolBar.Button onClick={addDiamondNode} className="w-32 h-32 bg-green-500 mt-6 transition-transform hover:-translate-y-2" style={{ transform: 'rotate(45deg)' }} />
                <ToolBar.Button onClick={() => addTextNode()} className="w-32 h-32 border-1 border mt-6 transition-transform hover:-translate-y-2">Texto</ToolBar.Button>
            </ToolBar.Root>

            <div className="flex flex-col w-[350px] h-[550px] mt-20 fixed top-5 left-5 gap-4">
                <input
                    type="text"
                    placeholder="Título do fluxo"
                    value={flowTitle}
                    onChange={(e) => setFlowTitle(e.target.value)}
                    className="border p-2"
                />
                <button onClick={onSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Salvar Fluxo
                </button>
                <button onClick={onLoad} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Carregar Fluxo
                </button>

                <div className="flex flex-col gap-4 top-20 left-5">
                    <h2 className="text-lg font-bold">Fluxos Salvos:</h2>
                    <ul>
                        {savedFlows.map((savedFlow, index) => (
                            <li key={index} className="flex justify-between gap-4">
                                <span>{savedFlow.title}</span>
                                <button
                                    onClick={() => loadFlow(savedFlow.flow)}
                                    className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400">
                                    Carregar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
