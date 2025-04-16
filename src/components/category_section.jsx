import CategoryCard from "@/components/category_card";

const CategorySection = ({ title, description, categories, isLoading }) => {

  if (isLoading)
    return (
      <p>loading...</p>
    );

  return (
    <section aria-labelledby="categories" className="bg-primary_saturated">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 py-15">
      <h2
        id="categories"
        className="text-2xl font-semibold mb-2 text-gray-800"
      >
        {title}
      </h2>
      <p className="mb-6 text-gray-700">{description}</p>
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Render each category */}
        {categories.map((category) => {
          return (
            <CategoryCard
              key={category.title}
              title={category.title}
              description={category.description}
              href={category.href}
              count={category.count}
              image={category.thumbnail}
              alt={category.alt}
            />
          );
        })}
      </div>
      </div>
    </section>
  );
};

export default CategorySection;