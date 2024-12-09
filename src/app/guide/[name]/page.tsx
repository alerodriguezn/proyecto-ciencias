
import NewtonDiskMain from "@/components/newton-disk-main";
import CircuitSimulator from "@/components/circuit-simulator";
import RocketSimulator from "@/components/rocket-simulator";
import DragDropActivity from "@/components/noise-simulator";
import CoordinateGame from "@/components/find-treasure"
import { RabbitGame } from "@/components/game-board";
import Circuit2 from "@/components/circuit-dnd";


interface GuidePageProps {
  params: {
    name: string;
  };
}

export default function GuidePage({ params }: GuidePageProps) {
 
  const { name } = params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {name === "newton-disk" && <NewtonDiskMain />}
      {name === "circuit-simulator" && <CircuitSimulator />}
      {name === "rocket-simulator" && <RocketSimulator />}
      {name === "noise-simulator" && <DragDropActivity />}
      
      {name === "find-treasure" && <CoordinateGame />}
      { name === "rabbit-game" &&  <RabbitGame/>}
      {
        name == "circuit-2" && <Circuit2 />
      }
      
    </div>
  )
}
