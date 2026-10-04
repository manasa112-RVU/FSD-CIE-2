function CategoryPills({ categories, selected, onSelect }) {
    return (
        <div className="category-pills">
            {categories.map((category) => (
                <button
                    key={category}
                    type="button"
                    className={
                        selected === category
                            ? "category-pill active-category"
                            : "category-pill"
                    }
                    onClick={() => onSelect(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

export default CategoryPills;
