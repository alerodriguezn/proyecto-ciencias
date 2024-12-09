"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

interface DropZone {
  id: string;
  accepts: string;
  label: string;
}

const Circuit2 = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [items, setItems] = useState([
    { id: "fuente", content: "Fuente de energía" },
    { id: "cable", content: "Cable" },
    { id: "bombillo", content: "Bombillo" },
    { id: "union", content: "Unión" },
  ]);

  const [dropZones] = useState<DropZone[]>([
    { id: "drop1", accepts: "fuente", label: "( 1 ) Elemento que proporciona la energía al circuito" },
    { id: "drop2", accepts: "cable", label: "( 2 ) Conductor que transporta la electricidad" },
    { id: "drop3", accepts: "bombillo", label: "( 3 ) Dispositivo que convierte la energía eléctrica en luz" },
  ]);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showWinDialog, setShowWinDialog] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [droppedItems, setDroppedItems] = useState<Record<string, any>>({});

  useEffect(() => {
    const allCorrect = dropZones.every((zone) => answers[zone.id] === zone.accepts);
    if (allCorrect && Object.keys(answers).length === dropZones.length) {
      setShowWinDialog(true);
    }
  }, [answers, dropZones]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { destination, draggableId } = result;
    const dropZone = dropZones.find(zone => zone.id === destination.droppableId);
    const draggedItem = items.find(item => item.id === draggableId);

    if (!dropZone || !draggedItem) return;

    if (dropZone.accepts === draggedItem.id) {
      setAnswers(prev => ({ ...prev, [dropZone.id]: draggedItem.id }));
      setDroppedItems(prev => ({ ...prev, [dropZone.id]: draggedItem }));
      toast.success("¡Correcto!");
    } else {
      toast.error("Intenta de nuevo");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Identifica los elementos del circuito
        </h1>

        <DragDropContext onDragEnd={handleDragEnd}>
          {/* Lista de elementos arrastrables */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Elementos disponibles:</h2>
            <Droppable droppableId="items" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-sm"
                >
                  {items.map((item, index) => {
                    // No mostrar el item si ya está en una zona de destino
                    if (Object.values(droppedItems).some(droppedItem => droppedItem.id === item.id)) {
                      return null;
                    }
                    return (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={cn(
                              "px-4 py-2 bg-blue-500 text-white rounded-md cursor-move transition-transform",
                              snapshot.isDragging && "shadow-lg scale-105"
                            )}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Imagen del circuito y zonas para soltar */}
          <div className="relative">
            <Image 
              src="/imgs/circuito.png" 
              alt="Circuito"
              className=" max-w-3xl mx-auto w-[300px] "
              width={600}
                height={600}

            />
            
            <div className="mt-8 space-y-4">
              {dropZones.map((zone) => (
                <Droppable key={zone.id} droppableId={zone.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn(
                        "p-4 border-2 border-dashed rounded-lg transition-colors min-h-[60px]",
                        snapshot.isDraggingOver ? "border-blue-500 bg-blue-50" : "border-gray-300",
                        answers[zone.id] && "border-green-500 bg-green-50"
                      )}
                    >
                      <p className="text-gray-700 mb-2">{zone.label}</p>
                      {droppedItems[zone.id] && (
                        <div className="px-4 py-2 bg-blue-500 text-white rounded-md inline-block">
                          {droppedItems[zone.id].content}
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </div>
        </DragDropContext>

        <AlertDialog open={showWinDialog} onOpenChange={setShowWinDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¡Felicitaciones! 🎉</AlertDialogTitle>
              <AlertDialogDescription>
                Has identificado correctamente todas las partes del circuito:
                <ul className="list-decimal pl-6 mt-2 space-y-1">
                  <li>Fuente de energía: Proporciona la energía al circuito</li>
                  <li>Cable: Conductor que transporta la electricidad</li>
                  <li>Bombillo: Dispositivo que convierte la energía eléctrica en luz</li>
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>
                <Link href="/guide/circuit-simulator">
                  Nueva actividad
                </Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Circuit2;