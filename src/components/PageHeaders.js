import styles from '@/styles/pageHeaders.module.css';
import { useRouter } from 'next/router';
import { navLinks } from "@/components/config";


export default function PageHeaders(){
const dynamicRoute = useRouter().asPath;
const activeIdx = navLinks.findIndex((menu) => menu.url === dynamicRoute);

    return (
        <div className={styles.pageHeader}>
            <h1 className={styles.pageHeader__h1}><span className={styles.pageHeader__num}>{activeIdx}.</span>{navLinks[activeIdx].name}</h1>
        </div>
    )
}