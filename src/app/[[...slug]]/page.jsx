import "../styles/global.css";
import { ClientOnly } from './client'
import Welcome from "../welcome/page"
import NotFound from "../notfound/NotFound";

 
export function generateStaticParams() {
  
  return [{slug: ['']}, {slug: ['blog']}, {slug: ['profile']}, {slug: ['about']}, {slug: ['contact']}, {slug: ['settings']}, {slug: ['products']},
  {slug: ['posts']}, {slug: ['login']},{slug: ['404']}]
}
 

export default function Page(params) {
  

  
  return <ClientOnly />
}