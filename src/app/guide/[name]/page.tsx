
import NewtonDiskMain from "@/components/newton-disk-main";
import CircuitSimulator from "@/components/circuit-simulator";
import RocketSimulator from "@/components/rocket-simulator";
import DragDropActivity from "@/components/noise-simulator";

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
    </div>
  )
}
