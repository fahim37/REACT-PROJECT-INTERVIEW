import React, { useEffect, useState } from "react";

const pageSize = 3;

const CoursePagination = ({ setPaginationItems, items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / pageSize);

  useEffect(() => {
    const from = (currentPage - 1) * pageSize;
    const to = from + pageSize;
    const paginatedItems = items.slice(from, to);
    setPaginationItems(paginatedItems);
  }, [currentPage, items, setPaginationItems]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center items-center mt-4 space-x-1">
      <button
        className="rounded-full border border-slate-300 py-2 px-3 text-center text-sm shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 disabled:pointer-events-none disabled:opacity-50"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`min-w-9 rounded-full py-2 px-3.5 border border-transparent text-center text-sm transition-all shadow-md focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 ${
            currentPage === index + 1
              ? "bg-slate-800 text-white"
              : "border border-slate-300 text-slate-600"
          }`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="rounded-full border border-slate-300 py-2 px-3 text-center text-sm shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 disabled:pointer-events-none disabled:opacity-50"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default CoursePagination;
