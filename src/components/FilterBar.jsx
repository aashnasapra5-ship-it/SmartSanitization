/* ========================================
   FilterBar Component
   ========================================
   Demonstrates: Props (filter, onFilterChange), .map() with arrays,
   event handling, conditional className
   Used in both Citizen and Municipal Dashboards
   ======================================== */

function FilterBar({ filter, onFilterChange }) {
  // All possible filter options
  const filters = ['All', 'Pending', 'Verified', 'Assigned', 'Cleaning', 'Resolved'];

  return (
    <div className="filter-bar" role="group" aria-label="Filter complaints by status">
      {filters.map(function (filterOption) {
        // Determine if this filter button is active
        const isActive = filter === filterOption;
        let className = 'filter-btn';
        if (isActive) {
          className = className + ' active';
        }

        return (
          <button
            key={filterOption}
            className={className}
            onClick={function () { onFilterChange(filterOption); }}
            aria-pressed={isActive}
          >
            {filterOption}
          </button>
        );
      })}
    </div>
  );
}

export default FilterBar;
