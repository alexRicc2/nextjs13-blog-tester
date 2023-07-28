import Link from "next/link";
import s from './CategoriesList.module.css'
const CategoriesList = ({ categories }: any) => {
  return (
    <div className={s.categoriesContainer}>
      <div>Top categories:</div>
      <nav>
        <ul className={s.categoriesList}>
          {categories?.slice(0,3).map(({ category }: any) => {
            return (
              <li key={category?.id}>
                <Link href={`/category/${category?.slug}`} className={s.categoryLink}>
                  {category?.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
export default CategoriesList;
