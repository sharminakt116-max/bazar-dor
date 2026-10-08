import Link from "next/link";


const NavLinks = async() => {
    const res=await fetch('https://api.api-store.workers.dev/api/bazardor/categories')
    const data=await res.json();
  
  console.log(data)
    

  
    return (
        
        <div className="max-w-7xl mx-auto px-5">
      {data.map((n) => (
        <Link key={n.id} href={n.slug}>
          {n.nameBn} {n.icon}
        </Link>
      ))}
            
        </div>
    );
};

export default NavLinks;