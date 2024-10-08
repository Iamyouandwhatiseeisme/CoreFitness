import "../styles/global.css";
import { ClientOnly } from './client'
 
export function generateStaticParams() {
  return [{ slug: [''] } , {slug: ['blog']}, {slug: ['profile']}, {slug: ['about']}]
}
 
export default function Page() {
  return <ClientOnly />
}