import { useRouter } from "next/router";
import React from "react";

export default function XmlViewer() {
  const router = useRouter();
  const { xmlData } = router.query;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">XML Data</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {decodeURIComponent(xmlData)}
      </pre>
    </div>
  );
}
