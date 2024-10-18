/* eslint-disable react/prop-types */
import { FaUser, FaAddressCard, FaSuitcase, FaHeart } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { useData } from "../hooks/useData";

export default function LeftSideBar(props) {
    const data = useData()
    const sideBarArray = data.form.groups
    const iconArray = [FaUser , FaAddressCard, FaSuitcase , IoSchool, FaHeart]

    return (
        <>
            <h2 className="text-lg font-bold mb-4">Personal</h2>
            <ul className="space-y-2">
                {sideBarArray.map((group, idx) => (
                    <li key={idx} className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md ${props.selectedItem === idx ? 'bg-slate-200' : ''}`} onClick={() => props.setSelectedItem(idx)}>
                        <span className="icon-placeholder">
                            {iconArray[idx % iconArray.length]()}
                        </span>
                        <span>{group.title}</span>
                    </li>
                ))}
            </ul>

        </>
    )
}