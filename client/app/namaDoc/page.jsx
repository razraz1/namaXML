"use client";


import SearchDocs from "../component/SearchDocs";

export default function namaDoc() {
  function formatDate(dateStr) {
    if (!dateStr || dateStr.length !== 8) return dateStr;
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${year}/${month}/${day}`;
  }

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Input for file path */}
      <SearchDocs formatDate={formatDate} />
    </div>
  );
}
