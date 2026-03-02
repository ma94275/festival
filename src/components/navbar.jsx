import React from "react";
import {Link} from "react-router-dom";
import home from "../assets/icons/home.svg";
import user from "../assets/icons/user.svg";
import archive from "../assets/icons/archive.svg";

export default function Navbar(){
    return(
        <div className="flex justify-between w-full h-[80px] border-b-[1px] border-[#707070] pl-[40px] pr-[40px] items-center bg-[#F4F4F4]">
            <span className="font-noto font-extrabold text-[40px] text-[#002455]">PolishMe</span>
            <div className="flex gap-[40px]">
                <Link to="/home">
                    <img src={home} alt="home" />
                </Link>
                <Link to="/mypage">
                    <img src={user} alt="user" />
                </Link>
                <Link to="/archive">
                    <img src={archive} alt="archive" />
                </Link>
            </div>
        </div>
    )
}