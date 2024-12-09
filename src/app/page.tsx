// "use client";

// import Link from "next/link";
// import { GiPrism, GiCircuitry, GiRocket, GiWaves } from "react-icons/gi";
// import { motion } from "framer-motion";

// export default function Home() {
//   const guides = [
//     {
//       name: "rocket-simulator",
//       title: "Simulador de Cohete",
//       icon: GiRocket,
//       color: "bg-gradient-to-br from-red-400 to-orange-500",
//     },
//     {
//       name: "newton-disk",
//       title: "Óptica y los fenómenos cotidianos",
//       icon: GiPrism,
//       color: "bg-gradient-to-br from-purple-400 to-pink-500",
//     },
//     {
//       name: "circuit-simulator",
//       title:
//         "¡Explora el Mundo de la Electricidad y los Circuitos: Una Aventura para Niños Curiosos!",
//       icon: GiCircuitry,
//       color: "bg-gradient-to-br from-blue-400 to-green-500",
//     },
//     {
//       name: "noise-simulator",
//       title: "Actividad de Ruido",
//       icon: GiWaves,
//       color: "bg-gradient-to-br from-green-400 to-yellow-500",
//     },
//     {
//       name: "find-treasure",
//       title: "Encuentra el Tesoro",
//       icon: GiPrism,
//       color: "bg-gradient-to-br from-yellow-400 to-orange-500",
//     },
//     {
//       name: "rabbit-game",
//       title: "Los Conejos de Fibonacci",
//       icon: GiRocket,
//       color: "bg-gradient-to-br from-red-400 to-orange-500",
//     },
//   ];

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
//       <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">
//         ¡Aventuras Científicas! 🚀
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl px-4">
//         {guides.map((guide) => (
//           <motion.div
//             key={guide.name}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Link
//               href={`/guide/${guide.name}`}
//               className={`${guide.color} aspect-square rounded-2xl shadow-lg transition-all duration-300 flex flex-col items-center justify-center p-6 text-center text-xl font-semibold gap-4 text-white hover:shadow-xl`}
//             >
//               <div className="flex flex-col items-center justify-center gap-4 h-full">
//                 <span className="text-2xl">{guide.title}</span>
//                 {guide.icon && (
//                   <motion.div
//                     animate={{ rotate: [0, 10, -10, 0] }}
//                     transition={{ repeat: Infinity, duration: 2 }}
//                   >
//                     <guide.icon size={64} />
//                   </motion.div>
//                 )}
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }


import Link from 'next/link'
import { PiFunction, PiAtom } from 'react-icons/pi'

export default function Home() {
  return (
    <div className="flex h-screen">
      <Link href="/math" className="w-1/2 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 flex flex-col items-center justify-center text-white">
        <PiFunction className="text-8xl mb-4" />
        <h2 className="text-4xl font-bold">Matemáticas</h2>
      </Link>
      <Link href="/science" className="w-1/2 bg-green-500 hover:bg-green-600 transition-colors duration-300 flex flex-col items-center justify-center text-white">
        <PiAtom className="text-8xl mb-4" />
        <h2 className="text-4xl font-bold">Ciencias</h2>
      </Link>
    </div>
  )
}
