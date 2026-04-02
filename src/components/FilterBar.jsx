function FilterBar({
  searchTerm,
  selectedGenre,
  sortOrder,
  genres,
  onSearchChange,
  onGenreChange,
  onSortChange,
  onResetFilters,
}) {
  return (
    <section className="filter-bar">
      <div className="filter-row">
        <div className="filter-group filter-group-large">
          <label htmlFor="search" className="filter-label">
            Recherche
          </label>
          <input
            id="search"
            type="text"
            className="filter-input"
            placeholder="Titre ou auteur"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="genre" className="filter-label">
            Genre
          </label>
          <select
            id="genre"
            className="filter-select"
            value={selectedGenre}
            onChange={onGenreChange}
          >
            <option value="">Tous</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sortDate" className="filter-label">
            Date
          </label>
          <select
            id="sortDate"
            className="filter-select"
            value={sortOrder}
            onChange={onSortChange}
          >
            <option value="">Aucun tri</option>
            <option value="desc">Récent → Ancien</option>
            <option value="asc">Ancien → Récent</option>
          </select>
        </div>

        <div className="filter-actions">
          <button
            type="button"
            className="btn btn-reset"
            onClick={onResetFilters}
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </section>
  );
}

export default FilterBar;