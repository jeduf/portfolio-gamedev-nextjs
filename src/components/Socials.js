import Link from "next/link";
import { socialMedia } from "@/components/config";

const Socials = () => {
    return(
        <div className="socials">
            {socialMedia.map((social) => (
                <Link href={social.url} key={social.name} className="socials_Link">
                    <div className="socials_IconsDiv">
                        {<social.data />}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Socials
