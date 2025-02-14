import { Link } from "react-router";

export default function Header(){
    return (
        <header>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/pets/new'>Create Pet</Link></li>
            </ul>
        </header>
    )
}