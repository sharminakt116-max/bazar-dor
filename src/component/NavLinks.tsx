import Link from "next/link";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: Category[] = await res.json();

  return (
    <nav className="mx-auto max-w-7xl overflow-x-auto py-2">
      <div className="flex min-w-max items-center">
        {data.map((n) => (
          <Link
            className="px-3 whitespace-nowrap hover:text-green-600"
            key={n.id}
            href={`/category/${n.slug}`}
          >
            {n.icon} {n.nameBn}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;