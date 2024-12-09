"use client";

import React, { useState } from "react";
import Image from "next/image";

const DragDropActivity = () => {

  console.log("DragDropActivity");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const activities = [
    { id: 1, name: <Image src="/imgs/trafico.png" alt="Car" className="w-40" width={200} height={200} />, isNoise: true },
    { id: 2, name: <Image src="/imgs/lavadora.png" alt="Lavadora" className="w-40" width={200} height={200} />, isNoise: false },
    { id: 3, name: <Image src="/imgs/lluvia.png" alt="Lluvia" className="w-40" width={200} height={200} />, isNoise: false },
    { id: 4, name: <Image src="/imgs/maquinaria.png" alt="Maquinaria" className="w-40"width={200} height={200} />, isNoise: true },
    { id: 5, name: <Image src="/imgs/yoga.png" alt="Yoga" className="w-40" width={200} height={200} />, isNoise: false },
    { id: 6, name: <Image src="/imgs/concierto.png" alt="Concierto" className="w-40" width={200} height={200} />, isNoise: true },
  ];

  const [selectedActivities, setSelectedActivities] = useState<number[]>([]);

  const handleDrop = (id: number) => {
    const droppedActivity = activities.find((activity) => activity.id === id);
    
    if (droppedActivity && droppedActivity.isNoise) {
      if (!selectedActivities.includes(id)) {
        setSelectedActivities([...selectedActivities, id]);
        setFeedback("¡Correcto! Esta actividad produce ruido.");
      }
      
      const noisyActivities = activities.filter(a => a.isNoise);
      if (selectedActivities.length + 1 === noisyActivities.length) {
        setIsCompleted(true);
        setFeedback("¡Felicitaciones! ¡Has encontrado todas las actividades ruidosas!");
      }
    } else {
      setFeedback("Esta actividad no produce ruido. ¡Intenta con otra!");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">
        ¿Qué actividades producen ruido?
      </h1>
      <div className="flex gap-4 flex-wrap mb-6">
        {activities.map((activity) => (
          !selectedActivities.includes(activity.id) && (
            <div
              key={activity.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("id", activity.id.toString())}
              className="p-4 bg-gray-100 rounded shadow cursor-grab hover:bg-gray-200"
            >
              {activity.name}
            </div>
          )
        ))}
      </div>
      {!isCompleted && (
        <div
          className="w-full md:w-1/2 h-40 border-2 border-dashed border-gray-400 rounded flex items-center justify-center mb-6"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const id = parseInt(e.dataTransfer.getData("id"));
            handleDrop(id);
          }}
        >
          <p className="text-gray-500">Arrastra aquí las actividades que producen ruido</p>
        </div>
      )}
      {feedback && (
        <p
          className={`mt-4 text-lg font-semibold ${
            feedback.includes("Correcto") || feedback.includes("Felicitaciones")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {feedback}
        </p>
      )}
    </div>
  );
};

export default DragDropActivity;