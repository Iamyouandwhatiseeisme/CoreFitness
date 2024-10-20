import "../styles/global.css";
import { ClientOnly } from './client'
import Custom404 from "../404";
import { UserProvider } from "../components/UserProvider/UserProvider";

 
export function generateStaticParams() {
  
  return [{slug: ['']},
   {slug: ['blog']}, 
   {slug: ['profile']}, 
   {slug: ['about']}, 
   {slug: ['contact']},
   {slug: ['settings']}, 
   {slug: ['products']},
   {slug: ['posts']},
   {slug: ['login']},
   {slug: ['404']}]
}
 

export default function Page(params) {
  
  const validPaths = ['', 'blog', 'profile', 'about', 'contact', 'settings', 'products', 'posts', 'login'];
  var currentPath = params.params.slug;
  
  

  if(!currentPath || validPaths.includes(currentPath)){
    return <ClientOnly />
  }else{
    return <Custom404 />
  }

  
}