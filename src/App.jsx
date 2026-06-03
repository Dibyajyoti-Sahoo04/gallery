import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Components/Card";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'




export default defineConfig({
  plugins: [react()],
  base: '/gallery/',
})

const App = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(1);

  const getdata = async () => {
    const respons = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=28`,
    );
    setData(respons.data);
    console.log(data);
  };

  let printUserdata = (
    <h3 className="text-gray-300 text-lg font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      Loding...
    </h3>
  );

  if (data.length > 0) {
    printUserdata = data.map((elem, idx) => {
      return (
        <div key={idx}>
          <Card elem={elem} />
        </div>
      );
    });
  }

  useEffect(() => {
    getdata();
  }, [index]);

  return (
    <div className=" bg-black h-screen overflow-auto p-20 text-white">
      <div className=" flex flex-wrap gap-4 p-2">{printUserdata}</div>

      <div className="flex justify-center items-center gap-10 p-8">
        <button
          style={{ opacity: index == 1 ? 0.5 : 1 }}
          onClick={() => {
            if (index > 1) setIndex(index - 1);
            setData([]);
          }}
          className="bg-amber-400 text-black rounded px-4 py-2 font-semibold text-sm cursor-pointer active:scale-95"
        >
          Prev
        </button>
        <h4>Page {index}</h4>
        <button
          onClick={() => {
            setIndex(index + 1);
            setData([]);
          }}
          className="bg-amber-400 text-black rounded px-4 py-2 font-semibold text-sm cursor-pointer active:scale-95"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
