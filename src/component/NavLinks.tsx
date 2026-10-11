import Link from "next/link";


const NavLinks = async() => {
    const res=await fetch('https://api.api-store.workers.dev/api/bazardor/categories')
    const data=await res.json();
  
// console.log(data)
    

  
    return (
        
        <div className="max-w-7xl mx-auto py-2">
      {data.map((n) => (
        <Link className="px-3" key={n.id} href={n.slug}>
           {n.icon} {n.nameBn}
        </Link>
      ))}
            
        </div>
    );
};

export default NavLinks;