const Pagination = ({ page, setPage, totalPages }) => {
    if (totalPages <= 1) return null;
    return (
        <div className="flex justify-center items-center gap-4 mt-12 bg-white/80 border border-gray-100 py-3 px-6 rounded-2xl w-fit mx-auto shadow-md backdrop-blur-xs">
            {/* Prev Button */}
            <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-amber-600 text-white font-semibold text-sm rounded-xl hover:bg-amber-700 disabled:bg-gray-100 disabled:text-gray-400 transition cursor-pointer">
                Prev
            </button>

            {/* Page Text */}
            <span className="text-sm font-bold text-gray-600 px-2">
                Page {page} of {totalPages}
            </span>

            {/* Next Button */}
            <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-amber-600 text-white font-semibold text-sm rounded-xl hover:bg-amber-700 disabled:bg-gray-100 disabled:text-gray-400 transition cursor-pointer"
            >
                Next
            </button>

        </div>
    )
}
export default Pagination;